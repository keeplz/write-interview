/**
 *  1. 构造函数
      executor 函数

    2. status 和 value
      准备好 PENDING、FULFILLED、REJECTED

    3. status 和 value

    4. resolve 和 reject
      只有 pending 的时候才能改变 status 和 value

    5. constructor 中 执行 executor，传入  resolve 和 reject
      用 try catch 捕获执行过程的异常

    6. 实现 then
      判断 status 来确定是直接执行 onFulfilled/onRejected 还是添加到队列
      需要声明 onFulfilledCallbacks 和 onRejectedCallbacks

      resolve 和 reject 方法里的 callbacks.forEach 是用来
      实现”在promise状态改变时执行“

    7. 处理 onFulfilled/onRejected 的默认值

    8. 处理链式调用
      返回一个新的promise
      将 then 中的逻辑转换为 microtask
      实现 resolvePromise 逻辑
       - chaining cycle
       - promise
       - thenable
          - called 用来约束只能调用一次，如果 x.then 是function，就用x作为上下文调用，传入
       - 普通值

*/

// ========= why resolve should be an arrow function =================

// class Demo {
//   constructor(name) {
//     this.name = name;
//     // this.method = this.method.bind(this);
//   }
//   arr = () => {
//     console.log(this);
//     console.log(this.name);
//   };
//   method() {
//     console.log(this);
//     console.log(this.name);
//   }
// }
// const d = new Demo("d");
// const arr = d.arr;
// const method = d.method;

// arr();
// method();
// ========= why resolve should be an arrow function =================

// =============start Promise============================================================================================================================

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MPromise {
  catch(onR) {}
  finally(onFinally) {}
  static resolve(v) {}
  static reject(v) {}
}

function resolvePromise(promise, x, resolve, reject) {}

// console.log(1);

// setTimeout(() => {
//   console.log(4);
// }, 0);

// new MPromise((res) => {
//   console.log(2);
//   res(3);
// }).then((v) => {
//   console.log(v);
// });

// console.log(5);

// console.log(1);

// setTimeout(() => {
//   console.log(4);
// }, 0);

// new Promise((res) => {
//   console.log(2);
//   res(3);
// }).then((v) => {
//   console.log(v);
// });

// console.log(5);

// =============end Promise============================================================================================================================

// =============start Promise all============================================================================================================================

Promise.MyAll = function (promiseArr) {};

// Promise.MyAll([
//   new Promise((res) => setTimeout(() => res(1000), 1000)),
//   new Promise((res, rej) => setTimeout(() => rej(500), 500)),
//   new Promise((res) => setTimeout(() => res(2000), 2000)),
// ])
//   .then((v) => {
//     console.log(v);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// =============end Promise all============================================================================================================================

// =============start Promise race============================================================================================================================

MPromise.race = function (promiseArray) {};

// MPromise.race([
//   2,
//   new Promise((resolve) => {
//     setTimeout(() => resolve(1000), 1000);
//   }),
//   new Promise((resolve) => {
//     setTimeout(() => resolve(500), 500);
//   }),
//   new Promise((resolve) => {
//     setTimeout(() => resolve(2000), 2000);
//   }),
// ]).then((v) => {
//   console.log(v);
// });
// =============end Promise race============================================================================================================================

// 此版本实现在下面这个demo里面是有问题的
// const promise = new MPromise((resolve, reject) => {
//   const promise2 = MPromise.reject("error").then(
//     () => {
//       console.log(1);
//     },
//     () => {
//       console.log(2);
//     }
//   );
//   resolve(promise2);
// });
// promise.then(console.log);
