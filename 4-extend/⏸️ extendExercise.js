/**
 * 问题：
 * 1. 最主要的
 *    包含引用类型值的原型，导致实例共用
 * 2. 无法不影响其他实例的情况下向超类的构造函数传递参数
 * 3. constructor 丢失
 * 4. 修改子类原型方法需要在 prototype 替换之后
 */

function prototypeChainInherit() {
  // 实现核心
  // 用超类的实例作为子类的原型对象
  function SuperType() {
    this.colors = ["red"];
  }
  function SubType() {}

  SubType.prototype = new SuperType();
  SubType.prototype.constructor = SubType;

  const sub1 = new SubType();
  const sub2 = new SubType();

  sub1.colors.push("black");
  console.log(sub2.colors, sub2.constructor);
}

// prototypeChainInherit();

function stealingConstructorInherit() {
  // 实现核心
  // 在子类构造函数中调用超类的构造函数
  function SuperType(name) {
    this.name = name;
    this.colors = ["red"];
    this.sayName = function () {
      console.log(this.name, this.colors);
    };
  }
  function SubType(name = "default") {
    SuperType.call(this, name);
    this.age = 1;
  }

  const sub1 = new SubType("sub1");
  const sub2 = new SubType("sub2");
  sub1.colors.push("blue");
  console.log(sub1.colors, sub2.colors);
  console.log(sub1 instanceof SuperType);

  // 超类原型上的方法无法被子类复用（不存在原型链逻辑）
  //
}
// stealingConstructorInherit();

function combineInherit() {
  // 实现核心，结合了原型链和借用构造函数
  function SuperType(name) {
    this.name = name;
    this.colors = ["red", "green"];
  }
  SuperType.prototype.sayHi = function () {
    console.log(`hi, this is ${this.name}`);
  };

  function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
  }
  SubType.prototype = new SuperType();
  SubType.prototype.constructor = SubType;

  SubType.prototype.sayAge = function () {
    console.log(`age is ${this.age}`);
  };

  const sub1 = new SubType("sub1", 11);
  const sub2 = new SubType("sub2", 22);
  sub1.colors.push("sub1 color");
  sub2.colors.push("sub2 color");
  console.log(sub1.colors, sub2.colors);
  sub1.sayHi();
  sub2.sayAge();
}

// combineInherit();

function combineParasiticInherit() {
  function inherit(sub, sup) {
    const prototype = Object.create(sup.prototype);
    prototype.constructor = sub;
    sub.prototype = prototype;
  }

  function SuperType(name) {
    this.name = name;
    this.colors = ["red"];
  }
  SuperType.prototype.sayName = function () {
    console.log("My name : ", this.name);
  };

  function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
  }

  inherit(SubType, SuperType);

  SubType.prototype.sayAge = function () {
    console.log("My age: ", this.age);
  };

  const sub1 = new SubType("sub1", 11);
  const sub2 = new SubType("sub2", 22);

  sub1.colors.push("sub1 color");
  sub2.colors.push("sub2 color");

  sub1.sayName();
  sub1.sayAge();
  sub2.sayName();
  sub2.sayAge();
  console.log(sub1.colors, sub2.colors);
}

// combineParasiticInherit();
