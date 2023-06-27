// ============instanceof============================================================================================================================

// Function 1
function myInstanceof(left, right) {
  if (
    (typeof left !== "object" && typeof left !== "function") ||
    left == null
  ) {
    return false;
  }
  if (typeof right !== "function") {
    throw new TypeError("The right operand should be a function");
  }

  let leftProto = Object.getPrototypeOf(left);
  const rightPrototype = right.prototype;
  while (leftProto !== null) {
    if (leftProto === rightPrototype) return true;
    leftProto = Object.getPrototypeOf(leftProto);
  }
  return false;
}

// Function 2
function myInstanceof2(left, right) {
  if (
    (typeof left !== "object" && typeof left !== "function") ||
    left == null
  ) {
    return false;
  }
  if (typeof right !== "function") {
    throw new TypeError("The right operand must be a function");
  }

  return right.prototype.isPrototypeOf(left);
}
// ============instanceof============================================================================================================================

// ============Object.is============================================================================================================================

function myis(a, b) {
  if (a === b) {
    // 判断 +- 0
    return a !== 0 || 1 / x === 1 / y;
  } else {
    // NaN 的情况

    return a !== a && b !== b;
  }
}

// ============Object.is============================================================================================================================

// ============Object.assign============================================================================================================================

if (typeof Object.prototype.myAssign !== "function") {
  Object.defineProperty(Object.prototype, "myAssign", {
    value: function (target, ...sources) {
      if (target == null) {
        throw new Error("Can't convert null or undefined to object");
      }
      const O = Object(target);

      for (let source of sources) {
        if (source !== null) {
          for (let k in source) {
            if (Object.prototype.hasOwnProperty.call(source, k)) {
              O[k] = source[k];
            }
          }
        }
      }

      return O;
    },
    writable: false,
    enumerable: false,
    configurable: false,
  });
}
// const a = { a: 1 };
// const b = { a: 2, b: 3 };
// console.log(Object.myAssign(null, a));
// console.log(Object.myAssign(a, b));

// ============Object.assign============================================================================================================================

// ============Object.create============================================================================================================================

//  Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
function create(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}

// const obj = { eat: true };
// const o = create(obj);
// const o2 = Object.create(obj);
// console.log(o.eat === o2.eat);

// ============Object.create============================================================================================================================
