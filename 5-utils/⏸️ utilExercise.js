// --------debounce 防抖----------------------------------------------------------------------------------------

function debounce(f, ms, immediate = false) {}

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

function throttle(f, ms) {}

// f1000 最多每 1000ms 将调用传递给 f 一次

// let f1000 = throttle(console.log, 1000);
// f1000(1); // 显示 1
// f1000(2); // (节流，尚未到 1000ms)
// f1000(3); // (节流，尚未到 1000ms)
// --------throttle 节流----------------------------------------------------------------------------------------

// --------判断子字符串的位置-------------------------------------------------------------------------------------
// indexof
function isIndexof(sub, parent) {}

// console.log(isIndexof("ab", "jjabc") === 2);
// console.log(isIndexof("abd", "jjabc") === -1);
// console.log(isIndexof(-1, "jjabc") === -1);
// console.log(isIndexof("j", "jjabc") === 0);
// --------判断子字符串的位置-------------------------------------------------------------------------------------

// ---------String.prototype.trim------------------------------------------------------------------------------
String.prototype.myTrim = function () {};

// const trimDemo1 = "   abc   ";
// const trimDemo2 = "   abc";
// const trimDemo3 = "abc   ";
// const trimDemo4 = " a b ";
// console.log(trimDemo1.trim() === trimDemo1.myTrim());
// console.log(trimDemo2.trim() === trimDemo2.myTrim());
// console.log(trimDemo3.trim() === trimDemo3.myTrim());
// console.log(trimDemo4.trim() === trimDemo4.myTrim());

// ---------String.prototype.trim------------------------------------------------------------------------------

// ---------柯里化  curring------------------------------------------------------------------------------

const curry = (fn) => {};

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

// ---------柯里化  curring------------------------------------------------------------------------------

// ---------阶乘------------------------------------------------------------------------------

function factorial(num) {}

// console.log(factorial(5) === 120);
// console.log(factorial(2) === 2);
// console.log(factorial(1) === 1);
// console.log(factorial(0) === 0);
// console.log(factorial(-100) === 0);
// ---------阶乘------------------------------------------------------------------------------

// ---------数组扁平化-普通递归------------------------------------------------------------------------------

function flatNormal(arr) {}

// console.log(flatNormal([1, 2, [3, [4, 5]]]));
// ---------数组扁平化-普通递归------------------------------------------------------------------------------

// ---------数组扁平化-reduce------------------------------------------------------------------------------
function flatReduce(arr) {}
// console.log(flatReduce([1, 2, [3, [4, 5]]]));

// ---------数组扁平化-reduce------------------------------------------------------------------------------

// ---------对象扁平化------------------------------------------------------------------------------

function objectFlat(obj = {}) {}

// const obj = {
//   a: 1,
//   b: 2,
//   c: {
//     a: 1.1,
//     b: 1.2,
//     c: {
//       a: "1.1.1",
//     },
//   },
// };
// console.log(objectFlat(obj));

// ---------对象扁平化------------------------------------------------------------------------------

// ---------字符串反转 + bench------------------------------------------------------------------------------
function strReverseWithReverse(str) {}

function strReverseWithArrayShift(str) {}

function strReverseWithArraySwap(str) {}

// console.log(strReverseWithReverse("abcdefg"));
// console.log(strReverseWithArrayShift("abcdefg"));
// console.log(strReverseWithArraySwap("abcdefg"));

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
function arrayReverse(arr) {}

function arraySwap(arr) {}
// console.log(arrayReverse([1, 2, 3, 4, 5]));
// console.log(arraySwap([1, 2, 3, 4, 5]));

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

// 结论
// swap 比 reverse能够快约 1/4
// 双指针 swap 效率更好
// ------------------- bench ----------------

// ---------数组 + bench------------------------------------------------------------------------------

// --------类数组转化----------------------------------------------------------------------------------

const str = "abcd";

// console.log(Array.from(str));
// console.log(Array.prototype.slice.call(str));
// console.log([...str]);
// --------类数组转化----------------------------------------------------------------------------------

// --------千分位----------------------------------------------------------------------------------
// 千分位：每3个数字，加上一个逗号
// 10000 -> 10,000

// toLocaleString

function numFormat(num) {}

// const intString = 1234567894532;
// const floatString = 67343931231.454;
// console.log(numFormat(intString));
// console.log(numFormat(floatString));
// --------千分位----------------------------------------------------------------------------------

// --------回文数----------------------------------------------------------------------------------

const isPalindrome = (x) => {};

// const num = 12321;
// const num2 = 12323;
// console.log(isPalindrome(num));
// console.log(isPalindrome(num2));

// --------回文数----------------------------------------------------------------------------------

// --------素数----------------------------------------------------------------------------------
function isPrime(num) {}

// console.log(`9是不是素数？${isPrime(9)}`);
// console.log(`3是不是素数？${isPrime(3)}`);
// console.log(`8是不是素数？${isPrime(8)}`);
// console.log(`7是不是素数？${isPrime(7)}`);
// --------素数----------------------------------------------------------------------------------

// --------浅拷贝----------------------------------------------------------------------------------

// --------浅拷贝----------------------------------------------------------------------------------

// --------深拷贝----------------------------------------------------------------------------------
// 1. JSON.stringify
// 2. 手写递归

let deepClone;

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

function toCamelCase(s) {}

// console.log(toCamelCase("split-out-baby"));
// --------驼峰----------------------------------------------------------------------------------

// --------验证电话----------------------------------------------------------------------------------

function isPhone(tel) {}

// console.log(isPhone("ab17602209999") === false);
// console.log(isPhone("176022099999") === false);
// console.log(isPhone("17602209999") === true);
// --------验证电话----------------------------------------------------------------------------------

// --------验证邮箱----------------------------------------------------------------------------------

function isEmail(email) {}

// console.log(isEmail("54000") === false);
// console.log(isEmail("54000@") === false);
// console.log(isEmail("54000@qq") === false);
// console.log(isEmail("54000@qq.com") === true);
// console.log(isEmail("5400@0@qq.com") === false);
// --------验证邮箱----------------------------------------------------------------------------------
