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
// 11. 类数组转化
// 12. 千分位
// 13. 回文数
// 14. 浅拷贝
// 15. 深拷贝
// 16. 驼峰
// 17. 验证电话
// 18. 验证邮箱
// 19. 插值表达式的解析
// 20. 解析url param

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
    if (parent[i] === sub[0]) {
      let flag = true;
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

// const obj = {
//   a: 1,
//   b: 2,
//   c: {
//     a: 1.1,
//     b: 1.2,
//   },
// };

// console.log(objectFlat(obj));
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

// ---------数组反转 + bench------------------------------------------------------------------------------
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
// ---------数组反转 + bench------------------------------------------------------------------------------

// --------类数组转化----------------------------------------------------------------------------------

// const str = "abcd";
// console.log(Array.from(str));
// console.log(Array.prototype.slice.call(str));
// console.log([...str]);
// --------类数组转化----------------------------------------------------------------------------------

// --------千分位----------------------------------------------------------------------------------
// 千分位：每3个数字，加上一个逗号
// 10000 -> 10,000

// toLocaleString
var intString = 1234567894532;
var floatString = 67343931231.454;

// console.log(intString.toLocaleString());
// console.log(floatString.toLocaleString());

function numFormat(num) {
  num = String(num).split("."); // 分隔小数点

  let int = num[0];
  let pre = num[1];
  let res = "";
  while (int.length > 3) {
    res = "," + int.slice(-3) + res;
    int = int.slice(0, int.length - 3);
  }
  if (int !== "") res = int + res;

  return pre ? res + "." + pre : res;
}

// console.log(numFormat(intString), numFormat(floatString));
// --------千分位----------------------------------------------------------------------------------

// --------回文数----------------------------------------------------------------------------------

const isPalindrome = (x) => {
  const str = x.toString();

  let left = 0;
  let right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
};

// const num = 12321;
// const num2 = 12323;
// console.log(isPalindrome(num));
// console.log(isPalindrome(num2));

// --------回文数----------------------------------------------------------------------------------

// --------素数----------------------------------------------------------------------------------
function isPrime(num) {
  if (num <= 1) return false;

  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// console.log(`9是不是素数？${isPrime(9)}`);
// console.log(`3是不是素数？${isPrime(3)}`);
// console.log(`8是不是素数？${isPrime(8)}`);
// console.log(`7是不是素数？${isPrime(7)}`);
// --------素数----------------------------------------------------------------------------------

// --------浅拷贝----------------------------------------------------------------------------------
// 1. Object.assign
// 2. Array.prototype.concat
// 3. Array.prototype.slice
// 4. 扩展运算符
// --------浅拷贝----------------------------------------------------------------------------------

// --------深拷贝----------------------------------------------------------------------------------
// 1. JSON.stringify
//    弊端：a. Date 对象的处理存在问题(倒是可以通过 json.parse 的第二个回调参数来处理)
//            const a = {
//              time: new Date(),
//            };

//            const b = JSON.parse(JSON.stringify(a), (key, val) => {
//              console.log(key, val);
//              if (key === "time") {
//                return new Date(val);
//              }
//              return val;
//            });
//            console.log(typeof a.time, typeof b.time);
//         b. 会忽略值为 function、undefined 和 symbol 的属性

// 2. 手写递归
function isObject(obj) {
  return obj !== null && (typeof obj === "function" || typeof obj === "object");
}

function deepClone(source, hash = new WeakMap()) {
  if (!isObject(source)) return source;
  if (hash.has(source)) return hash.get(source);

  const target = Array.isArray(source) ? [] : {};
  hash.set(source, target);

  const symbols = Object.getOwnPropertySymbols(source);
  symbols.forEach((symbol) => {
    target[symbol] = isObject(source[symbol])
      ? deepClone(source[symbol], hash)
      : source[symbol];
  });

  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = isObject(source[key])
        ? deepClone(source[key], hash)
        : source[key];
    }
  }

  return target;
}

// const A = {
//   name: "a",
// };

// const s = Symbol.for("test");
// const B = {
//   from: A,
//   name: "B",
//   [s]: "hi",
// };
// A.from = B;

// const cloned = deepClone(B);
// console.log(cloned);
// --------深拷贝----------------------------------------------------------------------------------

// --------驼峰----------------------------------------------------------------------------------

function toCamelCase(s) {
  return s.replace(/-\w/g, (x) => x.slice(1).toUpperCase());
}

// console.log(toCamelCase("split-out-baby"));
// --------驼峰----------------------------------------------------------------------------------
// --------验证电话----------------------------------------------------------------------------------

function isPhone(tel) {
  return /^1[34578]\d{9}$/.test(tel);
}
// console.log(isPhone("ab17602209999") === false);
// console.log(isPhone("176022099999") === false);
// console.log(isPhone("17602209999") === true);
// --------验证电话----------------------------------------------------------------------------------

// --------验证邮箱----------------------------------------------------------------------------------

function isEmail(email) {
  return /^[a-zA-Z0-9_\-]+@[a-zA-Z0-9_\-]+(\.[a-zA-Z0-9_\-]+)+$/.test(email);
}

// console.log(isEmail("54000") === false);
// console.log(isEmail("54000@") === false);
// console.log(isEmail("54000@qq") === false);
// console.log(isEmail("54000@qq.com") === true);
// console.log(isEmail("54000@qq.com.cn") === true);
// console.log(isEmail("5400@0@qq.com") === false);
// --------验证邮箱----------------------------------------------------------------------------------

// --------插值表达式的解析原理----------------------------------------------------------------------------------

function render(template, data) {
  const reg = /\{\{(\w+)\}\}/;
  if (!reg.test(template)) return template;

  const propName = reg.exec(template)[1];
  const replacedTemplate = template.replace(reg, data[propName]);

  return render(replacedTemplate, data);
}
// const template = "我是{{name}}, 今年{{age}} 岁，性别 {{sex}}";
// const person = {
//   name: "嫩叠",
//   age: 12,
//   sex: "2in1",
// };

// console.log(render(template, person));
// --------插值表达式的解析原理----------------------------------------------------------------------------------

// --------解析url param----------------------------------------------------------------------------------
function parseSearchParam(url) {
  const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
  const paramsArr = paramsStr.split("&"); // 将字符串以 & 分割后存到数组中
  let paramsObj = {};
  // 将 params 存到对象中
  paramsArr.forEach((param) => {
    if (/=/.test(param)) {
      // 处理有 value 的参数
      let [key, val] = param.split("="); // 分割 key 和 value
      val = decodeURIComponent(val); // 解码
      val = isFinite(val) ? parseFloat(val) : val; // 判断是否转为数字

      if (paramsObj.hasOwnProperty(key)) {
        // 如果对象有 key，则添加一个值
        paramsObj[key] = [].concat(paramsObj[key], val);
      } else {
        // 如果对象没有这个 key，创建 key 并设置值
        paramsObj[key] = val;
      }
    } else {
      // 处理没有 value 的参数
      paramsObj[param] = true;
    }
  });
  return paramsObj;
}

let url =
  "http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled";
// --------解析url param----------------------------------------------------------------------------------

// --------打乱数组----------------------------------------------------------------------------------

function randomSort(a, b) {
  return Math.random() > 0.5 ? -1 : 1;
  //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}

function randomSortShuffle(arr) {
  // 洗牌算法
  for (let i = 0; i < arr.length; i++) {
    const j = i + Math.floor(Math.random() * (arr.length - i));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
var arrSorted = [1, 2, 3, 4, 5];
arrSorted.sort(randomSort);
console.log(arrSorted);
// --------打乱数组----------------------------------------------------------------------------------
