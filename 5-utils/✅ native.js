// call // apply // bind // new

// ========call=========================================================
Function.prototype.callDemo = function (context = globalThis, ...args) {
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
Function.prototype.applyDemo = function (context = globalThis, args) {
  if (typeof this !== "function")
    throw new TypeError("myApply must be called on a function");

  const fn = Symbol("fn");
  context[fn] = this;

  const result = context[fn](...args);
  delete context[fn];

  return result;
};
// ========apply=========================================================

// ========bind=========================================================

// bind 会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数

// new 调用 和 原型继承关系
Function.prototype.myBind = function (context = globalThis, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("myBind must be called on a function");
  }

  const fn = this;

  const func = function (...innerArgs) {
    const mixedArgs = [...args, ...innerArgs];
    if (this instanceof func) {
      // 通过 new 调用，绑定 this 为实例对象
      fn.apply(this, mixedArgs);
    } else {
      // 通过普通函数形式调用，绑定 context
      fn.apply(context, mixedArgs);
    }
  };
  // 支持 new 调用方式
  func.prototype = Object.create(fn.prototype);
  return func;
};

// ========bind=========================================================

// ========new=========================================================

function myNew(fn, ...args) {
  // 1. 检测不是函数
  // 2. 检测不是箭头函数
  if (typeof fn !== "function" || (typeof fn === "function" && !fn.prototype)) {
    throw new TypeError(`${fn} is not a constructor`);
  }
  let instance = Object.create(fn.prototype);
  let res = fn.apply(instance, args);
  return res !== null && (typeof res === "object" || typeof res === "function")
    ? res
    : instance;
}

// 题外话：判断一个函数是否是构造函数
// 1. 判断有无 prototype 属性
// 2. const isArrowFunction = (func) => /^.*\=>.*$/.test(func.toString())

// 这两种方法都可以通过代码绕过去
// 1. 给箭头函数添加 prototype 属性
// 2. function() {} 内嵌箭头函数并压缩空格、换行符，toString 之后就判定为 true 了

// js怎么做的？
// isConstruct(argument)
// argument 是 function 并且有 [[Construct]] 这个 innerMethod，返回 true
// https://tc39.es/ecma262/multipage/abstract-operations.html#sec-isconstructor

// ========new=========================================================
