// call // apply // bind // new

// ========call=========================================================
Function.prototype.callDemo = function (context = window, ...args) {
  if (typeof this !== "function")
    throw new TypeError("myCall must be called on a function");
  // 防止context中有名为 fn 的属性
  const fn = Symbol("fn");
  context[fn] = this;

  const result = context[fn](...args);
  // 当函数返回了一个新对象，则 delete 对其没作用
  // 若返回 this, 则 context 和 result 都是指向同一个对象，此时无所谓delete context 还是 result
  // 为了保持逻辑上的顺畅：返回新对象时候，result 上面没有 fn，所以这里就删除 context 的 fn
  delete context[fn];

  return result;
};

// ========call=========================================================

// ========apply=========================================================
Function.prototype.applyDemo = function (context = window, args) {
  if (typeof this !== "function")
    throw new TypeError("myApply must be called on a function");

  const fn = Symbol("fn");
  context[fn] = this;

  const result = context[fn](...args);
  delete context[fn];

  return result;
};
// ========apply=========================================================

// bind 会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数
Function.prototype.myBind = function (context = globalThis) {
  const fn = this;
  const args = Array.from(arguments).slice(1);
  const newFunc = function () {
    const newArgs = args.concat(...arguments);
    if (this instanceof newFunc) {
      // 通过 new 调用，绑定 this 为实例对象
      fn.apply(this, newArgs);
    } else {
      // 通过普通函数形式调用，绑定 context
      fn.apply(context, newArgs);
    }
  };
  // 支持 new 调用方式
  newFunc.prototype = Object.create(fn.prototype);
  return newFunc;
};

// new
function myNew(fn, ...rest) {
  let instance = Object.create(fn.prototype);
  let res = fn.apply(instance, rest);
  return res !== null && (typeof res === "object" || typeof res === "function")
    ? res
    : instance;
}
