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

function debounce(f, ms, immediate = false) {}

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

function throttle(f, ms) {}
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
