"use strict";

Array.prototype.filterMe = function (cb, thisArg) {};

// Array.prototype.filterMe.call(null);
// Array.prototype.filterMe.call([1, 2, 3], 123);
// console.log(Array.prototype.filterMe.call([1, 2, 3], (v) => v < 3));
// console.log(Array.prototype.filterMe.call("12345", (v) => v > 3));
// var arr = [1, , , , 4, 5, 6];
// console.log(Array.prototype.filterMe.call(arr, (v) => v > 3));

Array.prototype.mapMe = function (cb, thisArg) {};
// console.log(Array.prototype.mapMe.call(null));
// console.log(Array.prototype.mapMe.call([1, 2, 3], 123));
// console.log(Array.prototype.mapMe.call([1, 2, 3], (v) => v * 2));
// console.log(Array.prototype.mapMe.call("12345", (v) => v * 2));
// var arr = [1, , , , 4, 5, 6];
// console.log(Array.prototype.mapMe.call(arr, (v) => v > 3));
// console.log(Array.prototype.map.call(arr, (v) => v > 3));

Array.prototype.forEachMe = function (cb, thisArg) {};
// Array.prototype.forEachMe.call(null);
// Array.prototype.forEachMe.call([1, 2, 3], 123)
// Array.prototype.forEachMe.call([1, 2, 3], (v) => {
//   console.log(v);
// });
// Array.prototype.forEachMe.call("12345", (v) => console.log(v));
// Array.prototype.forEachMe.call([1, 2, , , 3, 4], (v) => console.log(v));

Array.prototype.reduceMe = function (cb, initialValue) {};
// var a = [, , , , 1, 2, , , , , , 3];
// console.log(Array.prototype.reduceMe.call(a, (a, b) => a + b));
// console.log(Array.prototype.reduceMe.call(a, (a, b) => a + b, 1));
// console.log(Array.prototype.reduceMe.call(null, (a, b) => a + b));
// console.log(Array.prototype.reduceMe.call([, , ,], (a, b) => a + b));
// console.log(Array.prototype.reduceMe.call([, , ,], (a, b) => a + b, 2));
