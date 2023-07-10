// table of contents
// 1. debounce
// 2. throttle
// 3. 判断子字符串的位置
// 4. String.prototype.trim
// 5. 柯里化 currying
// 6. 阶乘
// 7. 数组扁平化-普通递归
// 7.1 数组扁平化-reduce
// 8. 对象扁平化
// 9. 字符串反转 + bench
// 10. 数组反转 + bench

// debounce 防抖
// throttle 节流
// 二者的深入理解：https://css-tricks.com/debouncing-throttling-explained-examples/
// 装饰器函数参考：https://zh.javascript.info/call-apply-decorators#zhuang-shi-qi-he-han-shu-shu-xing

// --------debounce 防抖----------------------------------------------------------------------------------------
// https://github.dev/lodash/lodash/blob/4.17.15/lodash.js#L10304

/**
 * 场景
 * 输入框频繁输入，每次输入之后调用接口
 */

function debounceDemo(f, ms, immediate = false) {
  let timeout = null;
  return function (...args) {
    clearTimeout(timeout);

    if (immediate) {
      const executable = !timeout;
      timeout = setTimeout(() => (timeout = null), ms);
      if (executable) f.apply(this, args);
    } else {
      timeout = setTimeout(() => f.apply(this, args), ms);
    }
  };
}

// const f = debounce(console.log, 1000, true);
// f("a");
// setTimeout(() => f("b"), 800);
// setTimeout(() => f("c"), 1200);
// setTimeout(() => f("d"), 2300);

// const f2 = debounce(console.log, 1000);
// setTimeout(() => f2("a"), 500);
// setTimeout(() => f2("b"), 500);
// setTimeout(() => f2("c"), 500);

// --------debounce 防抖----------------------------------------------------------------------------------------

// --------throttle 节流----------------------------------------------------------------------------------------
// 参考资料：https://zh.javascript.info/call-apply-decorators#jie-liu-zhuang-shi-qi

/**
 * 普通实现会缺少最后一次调用
 */

function throttleDemo(f, ms) {
  let isThrottled = false;
  let savedArgs;
  let savedThis;
  return function wrapper(...args) {
    if (isThrottled) {
      savedArgs = args;
      savedThis = this;
      return;
    }

    isThrottled = true;
    f.apply(this, args);

    setTimeout(() => {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedThis = savedArgs = null;
      }
    }, ms);
  };
}

// f1000 最多每 1000ms 将调用传递给 f 一次

// let f1000 = throttle(console.log, 1000);
// f1000(1); // 显示 1
// f1000(2); // (节流，尚未到 1000ms)
// f1000(3); // (节流，尚未到 1000ms)

// --------throttle 节流----------------------------------------------------------------------------------------

// --------判断子字符串的位置-------------------------------------------------------------------------------------
// indexof
function isIndexof(sub, parent) {
  for (let i = 0; i < parent.length; i++) {
    let flag = false;
    if (parent[i] === sub[0]) {
      flag = true;
      for (let k = 0; k < sub.length; k++) {
        if (sub[k] !== parent[k + i]) {
          flag = false;
          break;
        }
      }

      if (flag) {
        return i;
      }
    }
  }

  return -1;
}

// console.log(isIndexof("ab", "jjabc"));
// console.log(isIndexof("abd", "jjabc"));
// console.log(isIndexof(-1, "jjabc"));
// console.log(isIndexof("j", "jjabc"));
// --------判断子字符串的位置-------------------------------------------------------------------------------------

// ---------String.prototype.trim------------------------------------------------------------------------------
String.prototype.myTrim = function () {
  return this.replace(/^\s+/, "").replace(/\s+$/, "");
};

// const trimDemo1 = "   abc   ";
// const trimDemo2 = "   abc";
// const trimDemo3 = "abc   ";
// const trimDemo4 = " a b ";
// console.log(trimDemo1.trim() === trimDemo1.myTrim());
// console.log(trimDemo2.trim() === trimDemo2.myTrim());
// console.log(trimDemo3.trim() === trimDemo3.myTrim());
// console.log(trimDemo4.trim() === trimDemo4.myTrim());

// ---------String.prototype.trim------------------------------------------------------------------------------

// ---------柯里化  currying------------------------------------------------------------------------------
// 使用场景：
// 多参数函数拼装出不同的含有固定参数的函数
// function log(date, importance, message) {
//   alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
// }
//
// log = _.curry(log);
//
// let logNow = log(new Date());
// logNow("INFO", "message");
//
// let debugNow = logNow("DEBUG");
// debugNow("message");
// 资料：https://zh.javascript.info/currying-partials#ke-li-hua-mu-de-shi-shi-mo

// 让 f 支持如下调用
// f(a, b, c);
// f(a)(b, c);
// f(a, b)(c);

const curry = (fn) => {
  return function wrapper(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...laterArgs) {
        return wrapper.apply(this, [...args, ...laterArgs]);
      };
    }
  };
};

// function log(date, importance, message) {
//   console.log(
//     `[${date.getHours()}:${date.getMinutes()} [${importance}] ${message}]`
//   );
// }

// const curriedLog = curry(log);
// const logNow = curriedLog(new Date());
// logNow("INFO", "hello, this is logNow");

// const debugNow = logNow("debug");
// debugNow("debugging... bebop..🎵");

// ---------柯里化  currying------------------------------------------------------------------------------

// ---------阶乘------------------------------------------------------------------------------

function factorial(num) {
  if (num <= 0) return 0;
  if (num === 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}

// console.log(factorial(5) === 120);
// console.log(factorial(2) === 2);
// console.log(factorial(1) === 1);
// console.log(factorial(0) === 0);
// console.log(factorial(-100) === 0);
// ---------阶乘------------------------------------------------------------------------------

// ---------数组扁平化-普通递归------------------------------------------------------------------------------

function flatNormal(arr) {
  if (!Array.isArray(arr)) return;
  let flattedArray = [];

  for (let item of arr) {
    if (Array.isArray(item)) {
      flattedArray = flattedArray.concat(flatNormal(item));
    } else {
      flattedArray = flattedArray.concat(item);
    }
  }

  return flattedArray;
}

// console.log(flatNormal([1, 2, [3, [4, 5]]]));
// ---------数组扁平化-普通递归------------------------------------------------------------------------------

// ---------数组扁平化-reduce------------------------------------------------------------------------------
function flatReduce(arr) {
  return arr.reduce(
    (prev, cur) => prev.concat(Array.isArray(cur) ? flatReduce(cur) : cur),
    []
  );
}
// console.log(flatReduce([1, 2, [3, [4, 5]]]));

// ---------数组扁平化-reduce------------------------------------------------------------------------------

// ---------对象扁平化------------------------------------------------------------------------------

function objectFlat(obj = {}) {
  const flattedObject = {};

  function flat(obj, preKey = "") {
    Object.entries(obj).forEach(([key, val]) => {
      const flattedKey = preKey ? `${preKey}.${key}` : key;
      if (val !== null && typeof val === "object") {
        flat(val, flattedKey);
      } else {
        flattedObject[flattedKey] = val;
      }
    });
  }

  flat(obj);

  return flattedObject;
}

const obj = {
  a: 1,
  b: 2,
  c: {
    a: 1.1,
    b: 1.2,
  },
};

console.log(objectFlat(obj));
// ---------对象扁平化------------------------------------------------------------------------------

// ---------字符串反转 + bench------------------------------------------------------------------------------
function strReverseWithReverse(str) {
  return str.split("").reverse().join("");
}

function strReverseWithArrayShift(str) {
  const reversed = [];

  for (let i = 0; i < str.length; i++) {
    reversed.unshift(str[i]);
  }

  return reversed.join("");
}

function strReverseWithArraySwap(str) {
  const strArray = str.split("");

  let left = 0;
  let right = strArray.length - 1;
  while (left < right) {
    [strArray[left], strArray[right]] = [strArray[right], strArray[left]];
    left++;
    right--;
  }

  return strArray.join("");
}
// console.log(strReverseWithArrayShift("abcdefg"));

// ------------------- bench ----------------
// function bench(f, count = 100000) {
//   const start = Date.now();
//   for (let i = 0; i < count; i++) {
//     f();
//   }
//   return Date.now() - start;
// }
// let timeArrayShift = 0;
// let timeArraySwap = 0;
// let timeReverse = 0;
// for (let i = 0; i < 1000; i++) {
//   timeArrayShift += bench(() => strReverseWithArrayShift("abcdefg"), 1000);
//   timeArraySwap += bench(() => strReverseWithArraySwap("abcdefg"), 1000);
//   timeReverse += bench(() => strReverseWithReverse("abcdefg"), 1000);
// }
// console.log("unshift", timeArrayShift);
// console.log("swap", timeArraySwap);
// console.log("reverse", timeReverse);
// 结论
// unshift API 操作最慢，时间为 reverse 和 swap 的两倍
// reverse 和 swap 基本一致
// 所以掌握 【双指针-ArraySwap】和【reverse】就可以了
// ------------------- bench ----------------

// ---------字符串反转 + bench------------------------------------------------------------------------------

// ---------数组 + bench------------------------------------------------------------------------------
function arrayReverse(arr) {
  return arr.reverse();
}

function arraySwap(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    [arr[right], arr[left]] = [arr[left], arr[right]];
    left++;
    right--;
  }
  return arr;
}
// ------------------- bench ----------------
// function bench(f, count = 100000) {
//   const start = Date.now();
//   for (let i = 0; i < count; i++) {
//     f();
//   }
//   return Date.now() - start;
// }
// let reverseTime = 0;
// let swapTime = 0;
// for (let i = 0; i < 100000; i++) {
//   reverseTime += bench(() => arrayReverse([1, 2, 3, 4, 5]), 10000);
//   swapTime += bench(() => arraySwap([1, 2, 3, 4, 5]), 10000);
// }
// console.log("reverseTime", reverseTime);
// console.log("swapTime", swapTime);
// ------------------- bench ----------------

// 结论
// swap 比 reverse能够快约 1/4
// 双指针 swap 效率更好
// ---------数组 + bench------------------------------------------------------------------------------
