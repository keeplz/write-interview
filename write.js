// 数组去重 // 数组排序去重

// 数组排序
function sortUniq(arr) {
  arr.sort((a, b) => a - b);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i - 1]) {
      arr.splice(i, 1);
    }
  }
  return arr;
}
// 数组去重
let arr = [1, 2, 1, 1, "1"];
function foo(arr) {
  var res = [];
  for (var i; i < arr.length; i++) {
    var array = arr[i];
    if (res.indexOf(array) === -1) {
      res.push(array);
    }
  }
  return res;
}

// set
let a = new Set(arr);
let b = [...a];
// filter
function foo(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}
// include
const unique4 = (arr) => {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  });
};
// 数组排序去重
let foo = (array) => {
  return array
    .concat()
    .sort()
    .filter((item, index, array) => array.indexOf(item) === index);
};

// 法2
function shuffle(a) {
  var len = a.length;
  for (var i = 0; i < len; i++) {
    var end = len - 1;
    var index = (Math.random() * (end + 1)) >> 0;
    var t = a[end];
    a[end] = a[index];
    a[index] = t;
  }
  return a;
}
