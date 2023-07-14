// 模板引擎

// 数组去重 // 数组排序去重   // 解析url // 跨域 // 随机打乱数组 // 轮训

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

// 模板引擎
function render(template, data) {
  const reg = /\{\{(\w+)\}\}/; // 模板字符串正则
  if (reg.test(template)) {
    // 判断模板里是否有模板字符串
    const name = reg.exec(template)[1]; // 查找当前模板里第一个模板字符串的字段
    template = template.replace(reg, data[name]); // 将第一个模板字符串渲染
    return render(template, data); // 递归的渲染并返回渲染后的结构
  }
  return template; // 如果模板没有模板字符串直接返回
}
// 解析url
function parseParam(url) {
  const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
  const paramsArr = paramsStr.split("&"); // 将字符串以 & 分割后存到数组中
  let paramsObj = {};
  // 将 params 存到对象中
  paramsArr.forEach((param) => {
    if (/=/.test(param)) {
      // 处理有 value 的参数
      let [key, val] = param.split("="); // 分割 key 和 value
      val = decodeURIComponent(val); // 解码
      val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字

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
// 随机打乱数组
function randomsort(a, b) {
  return Math.random() > 0.5 ? -1 : 1;
  //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}
var arrSorted = [1, 2, 3, 4, 5];
arrSorted.sort(randomsort);
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
function setTimer() {
  let timer;
  axios
    .post(url, params)
    .then(function (res) {
      if (res) {
        console.log(res);
        timer = setTimeout(() => {
          this.setTimer();
        }, 5000);
      } else {
        clearTimeout(timer); //清理定时任务
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
