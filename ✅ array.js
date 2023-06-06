"use strict";
// filter
Array.prototype.filterMe = function (cb, thisArg) {
  if (this == null) {
    throw new TypeError("filter should not be called on null or undefined");
  }
  if (typeof cb !== "function") {
    throw new TypeError(`${cb} is not a function`);
  }
  const O = Object(this);
  const len = O.length;
  const res = [];
  for (let i = 0; i < len; i++) {
    if (i in O) {
      if (cb.call(thisArg, O[i], i, O)) {
        res.push(O[i]);
      }
    }
  }
  console.log(res);
  return res;
};

// Array.prototype.filterMe.call(null);
// Array.prototype.filterMe.call([1, 2, 3], 123);
// Array.prototype.filterMe.call([1, 2, 3], v => v < 3);
// Array.prototype.filterMe.call("12345", (v) => v > 3);
// var arr = [1, , , , 4, 5, 6];
// console.log(2 in arr, arr[2]);
// Array.prototype.filterMe.call(arr, (v) => v > 3);

// map
Array.prototype.mapMe = function (cb, thisArg) {
  // 严格模式下 call(null) 才是 null
  // 非严格模式下 call(null) 和 call(undefined) 会自动替换成window
  if (this == null) {
    throw new TypeError("this should not be undefined or null");
  }
  if (typeof cb !== "function") {
    throw new TypeError(
      `cb should be a function, it's current type is: ${typeof cb}`
    );
  }

  const O = Object(this);
  const len = O.length;
  // 下面要用到 in 操作符，所以这里调用 Object(this)
  // 把基本类型转换为对象
  const res = [];

  for (let i = 0; i < len; i++) {
    if (i in O) {
      // i in O 用来处理 [1,2,,,4,5] 这种 sparse 数组
      // map 在其上不会调用
      res[i] = cb.call(thisArg, O[i], i, O);
    }
  }

  return res;
};

// foreach
Array.prototype.forEachMe = function (cb, thisArg) {
  // 严格模式下 call(null) 才是 null
  // 非严格模式下 call(null) 和 call(undefined) 会自动替换成window
  if (this == null) {
    throw new TypeError("this should not be null or undefined");
  }
  if (typeof cb !== "function") {
    throw new TypeError(`${cb} is not a function`);
  }
  const O = Object(this);
  const len = O.length;
  // 下面要用到 in 操作符，所以这里调用 Object(this)
  // 把基本类型转换为对象
  let i = 0;
  while (i < len) {
    if (i in O) {
      // i in O 用来处理 [1,2,,,4,5] 这种 sparse 数组
      // forEach 在其上不会调用
      cb.call(thisArg, O[i], i, O);
    }
    i++;
  }
};
// reduce
Array.prototype.reduceMe = function (callback, initialValue) {
  // 严格模式下 call(null) 才是 null
  // 非严格模式下 call(null) 和 call(undefined) 会自动替换成window
  if (this == null) {
    throw new TypeError("this should not be null or undefined");
  }
  if (typeof cb !== "function") {
    throw new TypeError(`${cb} is not a function`);
  }
  const O = Object(this);
  const len = O.length;
  // 下面要用到 in 操作符，所以这里调用 Object(this)
  // 把基本类型转换为对象
  let k = 0;
  let acc = initialValue;

  // k in O 用来处理 [1,2,,,4,5] 这种 sparse 数组
  // reduce 在其上不会调用

  // acc 为 undefined 的时候
  // 用第一个有效元素作为 acc
  if (acc === undefined) {
    while (k < len && !(k in O)) k++;
    if (k === len)
      throw new Error("Reduce of empty array with no initial value");

    acc = O[k++];
  }

  while (k < len) {
    if (k in O) {
      acc = cb.call(undefined, acc, O[k], k, O);
    }
    k++;
  }
  return acc;
};
