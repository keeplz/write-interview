// 数组去重 // 数组排序去重 // 类数组转化数组 // 千分位 // 判断数字是否是回文数
// 判断是否是素数 // 深拷贝 // 转换成为驼峰 // 验证电话 // 验证邮箱
// 模板引擎 // 解析url // 跨域 // 随机打乱数组 // 轮训

// 浅拷贝：创建一个空对象，将原始对象的属性值进行拷贝，如果是基本类型，拷贝的就是值，如果是引用类型，拷贝的是内存地址
Object.assign();
concat();
slice();
// 展开运算符;
// 深拷贝：将一个对象从内存中拷贝一份，从堆内存中开辟一个新的空间进行存放

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

// 类数组转化数组
Array.from();
Array.prototype.slice.call();
[...array];

// 千分位
// toLocaleString
var aA = 1234567894532;
var bB = 67343931231.4542;

console.log(aA.toLocaleString());
console.log(bB.toLocaleString());
//
function numFormat(num) {
  num = num.toString().split("."); // 分隔小数点
  var arr = num[0].split("").reverse(); // 转换成字符数组并且倒序排列
  var res = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    if (i % 3 === 0 && i !== 0) {
      res.push(","); // 添加分隔符
    }
    res.push(arr[i]);
  }
  res.reverse(); // 再次倒序成为正确的顺序
  if (num[1]) {
    // 如果有小数的话添加小数部分
    res = res.join("").concat("." + num[1]);
  } else {
    res = res.join("");
  }
  return res;
}

// 判断数字是否是回文数
const isPalindrome = (x) => {
  if (x < 0) return false;
  let str = x.toString();
  return Array.from(str).reverse().join("") === str;
};
// 将a数字翻转成b，然后a,b变成字符串，然后进行比较a,b

// 判断是否是素数
function is_pri(m) {
  var result = [];
  if (m === 1) return false; //注意：1不是素数！！！

  for (let i = 2; i <= parseInt(Math.sqrt(m)); i++) {
    if (m % i === 0) {
      return "不是" + "," + "它至少可以被" + i + "整除";
    }
  }
  return "是";
}
// 法2
function p(n) {
  var n,
    i,
    flag = true;
  n = parseInt(n);
  for (i = 2; i <= n - 1; i++)
    if (n % i == 0) {
      flag = false;
      break;
    }
  if (flag == true) console.log(n + "是素数");
  else console.log(n + "不是素数");
}

// 深拷贝
function deepclone(source) {
  if (source === null || typeof source !== "object") {
    return source;
  }
  let res = Array.isArray(source) ? [] : {};
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      res[key] = deepclone(source[key]);
    }
  }
  return res;
}
function deepCopy(obj) {
  if (typeof obj === "object") {
    var result = obj.constructor === Array ? [] : {};
    for (var i in obj) {
      result[i] = typeof obj[i] === "object" ? deepCopy(obj[i]) : obj[i];
    }
  } else {
    var result = obj;
  }
  return result;
}

// 转换成为驼峰
function Foo(s) {
  return s.replace(/-\w/g, function (x) {
    return x.slice(1).toUpperCase();
  });
}
// 验证电话
function isPhone(tel) {
  var regx = /^1[34578]\d{9}$/;
  return regx.test(tel);
}
// 验证邮箱
function isEmail(email) {
  var regx = /^([a-zA-Z0-9_\-])+@([a-zA-Z0-9_\-])+(\.[a-zA-Z0-9_\-])+$/;
  return regx.test(email);
}

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
/**
 * 4、将一个json数据的所有key从下划线改为驼峰
 *
 * @param {object | array} value 待处理对象或数组
 * @returns {object | array} 处理后的对象或数组
 */
