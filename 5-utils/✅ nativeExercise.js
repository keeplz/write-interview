// call // apply // bind // new

// call 调用一个函数, 其具有一个指定的this值和分别地提供的参数(参数的列表)。
Function.prototype.myCall;

// apply 调用一个函数，以及作为一个数组（或类似数组对象）提供的参数
Function.prototype.myApply;

// bind  要让他支持 new 调用 和 原型继承关系

Function.prototype.myBind;

// new
function myNew(fn, ...args) {}
