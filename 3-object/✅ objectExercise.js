// ============instanceof============================================================================================================================
function myInstanceof(left, right) {}

function myInstanceof2(left, right) {}

// function Car() {}
// const bmw = new Car();
// console.log(myInstanceof2(bmw, Car));
// console.log(myInstanceof2(bmw, Function));
// console.log(myInstanceof2(Car, Function));

// ============instanceof============================================================================================================================

// ============Object.is============================================================================================================================

function is(a, b) {}
// console.log(is(undefined, undefined), Object.is(undefined, undefined));
// console.log(is(null, null), Object.is(null, null));
// console.log(is(NaN, NaN), Object.is(NaN, NaN));
// console.log(is(0, -0), Object.is(0, -0));
// console.log(is(0, 0), Object.is(0, 0));

// ============Object.is============================================================================================================================

// ============Object.assign============================================================================================================================

if (typeof Object.prototype.myAssign !== "function") {
}

// const a = { a: 1 };
// const b = { a: 2, b: 3 };
// console.log(Object.myAssign(a, b));
// console.log(Object.myAssign(null, a));
// console.log(Object.myAssign("abc", { a: 1 }));
// ============Object.assign============================================================================================================================

// ============Object.create============================================================================================================================

function create(proto) {}

// const obj = { eat: "eat" };
// const o = create(obj);
// const o2 = Object.create(obj);
// console.log(o.eat, o2.eat);

// ============Object.create============================================================================================================================
