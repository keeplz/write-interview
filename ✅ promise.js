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
        try {
          const x = onFulfilled(this.value);
          resolvePromise2(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      };
      const onRejectedMicroTask = () => {
        try {
          const x = onRejected(this.value);
          resolvePromise2(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
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

function resolvePromise(promise, x, resolve, reject) {
  if (x === promise) {
    reject(new Error("chaining cycle detected in promise"));
  } else if (x instanceof MPromise) {
    if (x.status === FULFILLED) {
      resolve(x.value);
    } else if (x.status === REJECTED) {
      reject(x.value);
    } else if (x.status === PENDING) {
      x.then((v) => resolvePromise(promise, v, resolve, reject), reject);
    }
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
      Promise.resolve(p).then(
        (val) => resolve(val),
        (err) => reject(err)
      );
    });
  });
};
// =============end Promise race============================================================================================================================
