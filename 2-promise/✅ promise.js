// =============start Promise============================================================================================================================

// 先定义三个常量表示状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
// 新建 MyPromise 类
class MPromise {
  status = PENDING;
  value = null;
  onFulfilledCallbacks = [];
  onRejectedCallbacks = [];
  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }
  resolve = (v) => {
    if (this.status === PENDING) {
      this.value = v;
      this.status = FULFILLED;
      this.onFulfilledCallbacks.forEach((cb) => cb(this.value));
    }
  };
  reject = (e) => {
    if (this.status === PENDING) {
      this.value = e;
      this.status = REJECTED;
      this.onRejectedCallbacks.forEach((cb) => cb(this.value));
    }
  };

  static resolve(v) {
    if (v instanceof MPromise) return v;
    return new MPromise((resolve) => {
      resolve(v);
    });
  }
  static reject(v) {
    return new MPromise((resolve, reject) => {
      reject(v);
    });
  }

  finally(onFinally) {
    return this.then(
      (v) => {
        if (typeof onFinally === "function") onFinally();
        return v;
      },
      (v) => {
        if (typeof onFinally === "function") onFinally();
        throw v;
      }
    );
  }
  catch(onR) {
    return this.then(undefined, onR);
  }
  then(onF, onR) {
    const onFulfilled = typeof onF === "function" ? onF : (v) => v;
    const onRejected =
      typeof onR === "function"
        ? onR
        : (e) => {
            throw e;
          };

    const promise2 = new MPromise((resolve, reject) => {
      const onFulfilledMicroTask = () => {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };
      const onRejectedMicroTask = () => {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };

      if (this.status === FULFILLED) {
        onFulfilledMicroTask();
      } else if (this.status === REJECTED) {
        onRejectedMicroTask();
      } else if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(onFulfilledMicroTask);
        this.onRejectedCallbacks.push(onRejectedMicroTask);
      }
    });
    return promise2;
  }
}

module.exports = MPromise;

function resolvePromise(promise, x, resolve, reject) {
  if (x === promise) {
    reject(new TypeError("chaining cycle detected in promise"));
  } else if (x instanceof MPromise) {
    x.then((v) => resolvePromise(promise, v, resolve, reject), reject);
  } else if (x !== null && (typeof x === "object" || typeof x === "function")) {
    // thenable
    let called = false;
    try {
      const then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (v) => {
            if (!called) {
              called = true;
              resolvePromise(promise, v, resolve, reject);
            }
          },
          (e) => {
            if (!called) {
              called = true;
              reject(e);
            }
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (!called) {
        called = true;
        reject(e);
      }
    }
  } else {
    resolve(x);
  }
}
// =============end Promise============================================================================================================================

// =============start Promise all============================================================================================================================

Promise.myAll = function (promiseArr) {
  return new Promise((resolve, reject) => {
    let count = 0;
    const result = [];
    promiseArr.forEach((p, index) => {
      Promise.resolve(p).then(
        (v) => {
          count++;
          result[index] = v;
          if (count === promiseArr.length) {
            resolve(result);
          }
        },
        (e) => reject(e)
      );
    });
  });
};
// =============end Promise all============================================================================================================================

// =============start Promise race============================================================================================================================

Promise.race = function (promiseArr) {
  return new Promise((resolve, reject) => {
    promiseArr.forEach((p) => {
      // 如果不是Promise实例需要转化为Promise实例
      Promise.resolve(p).then(resolve, reject);
    });
  });
};
// =============end Promise race============================================================================================================================

// =============start Promise allSettled============================================================================================================================
Promise.myAllSettled = function (promiseArr) {
  return new Promise((resolve) => {
    let count = 0;
    const res = [];
    const cb = (value, index, status) => {
      count++;
      res[index] = {
        status,
        value,
      };

      if (count === promiseArr.length) resolve(res);
    };

    promiseArr.forEach((p, i) => {
      Promise.resolve(p).then(
        (v) => cb(v, i, "fulfilled"),
        (e) => cb(e, i, "rejected")
      );
    });
  });
};

// Promise.myAllSettled([
//   new Promise((res) => setTimeout(res(2), 1000)),
//   new Promise((res) => setTimeout(res(3), 2000)),
//   new Promise((res, rej) => setTimeout(rej(1), 1000)),
// ]).then((v) => {
//   console.log(v);
// });
// =============end Promise allSettled============================================================================================================================

// 此版本实现在下面这个demo里面是有问题的
// const promise = new MPromise((resolve, reject) => {
//   console.log("???");
//   const promise2 = MPromise.reject("error").then(
//     () => {
//       console.log(1);
//     },
//     () => {
//       console.log(2);
//       return 222;
//     }
//   );
//   resolve(promise2);
// });
// promise.then(console.log);

// const anotherpromise = new Promise((resolve, reject) => {
//   console.log("???");
//   const promise2 = Promise.reject("error").then(
//     () => {
//       console.log(1);
//     },
//     () => {
//       console.log(2);
//       return 222;
//     }
//   );
//   resolve(promise2);
// });

// anotherpromise.then(console.log);
