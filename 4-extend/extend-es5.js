function ex1() {
  function SuperType() {
    this.colors = ["red"];
  }

  function SubType() {}
  SubType.prototype = new SuperType();
  SubType.prototype.constructor = SubType;
  var subT = new SubType();

  subT.colors.push("green");
  console.log(subT.colors);

  var subT2 = new SubType();
  subT2.colors.push("blue");

  console.log(subT2.colors);
}
ex1();

// 1. 原型链继承
// 缺点
// 1、多个实例对引用类型的操作会被篡改
// 2、子类型的原型上的 constructor 属性被重写了
// 3、给子类型原型添加属性和方法必须在替换原型之后
// 4、创建子类型实例时无法向父类型的构造函数传参

function ex2() {
  function SuperType() {
    this.colors = ["red"];
  }
  function SubType() {
    SuperType.call(this);
  }
  var a = new SubType();
  a.colors.push("a");
  var b = new SubType();
  b.colors.push("b");
  console.log(a, a.colors);
  console.log(b, b.colors);
}
// ex2();
// 2. 借用构造函数继承
// 缺点
//   1. 只能继承实例属性和方法，无法继承原型链上的
//   2. 每个子类都有父类实例方法的副本

function ex3() {
  function SuperType(name) {
    this.name = name;
    this.colors = ["superType"];
  }
  SuperType.prototype.saySuper = function () {
    console.log(this.name);
  };

  function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
  }

  SubType.prototype = new SuperType();
  SubType.prototype.constructor = SubType;

  const ins1 = new SubType("sub1", 1);
  const ins2 = new SubType("sub2", 2);
  ins1.colors.push("ins1");
  ins2.colors.push("ins2");
  ins1.saySuper();
  ins2.saySuper();
  console.log(ins1, ins2);
}
// ex3();
// 3. 组合继承
// 缺点
//   子类创建实例的时候，原型对象上会存有相同的两份属性/方法

function ex4() {
  function inheritPrototype(subType, superType) {
    var prototype = Object.create(superType.prototype); // 创建对象，创建父类原型的一个副本
    prototype.constructor = subType;
    subType.prototype = prototype;
  }

  function SuperType(name) {
    this.name = name;
    this.colors = ["superType"];
  }

  SuperType.prototype.sayName = function () {
    console.log(this.name);
  };

  function SubType(age, name) {
    SuperType.call(this, name);
    this.age = age;
  }

  inheritPrototype(SubType, SuperType);

  SubType.prototype.sayAge = function () {
    console.log(this.age);
  };
  const ins1 = new SubType(1, "ins1");
  const ins2 = new SubType(2, "ins2");
  ins1.colors.push("ins1");
  ins2.colors.push("ins2");
  ins1.sayName();
  ins1.sayAge();
  ins2.sayName();
  ins2.sayAge();
  console.log(ins1, ins2);
}
// ex4();
// 4. 寄生组合式继承
// 最成熟的继承

// es5 继承
function create(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}

// Parent
function Parent(name) {
  this.name = name;
}

Parent.prototype.sayName = function () {
  console.log(this.name);
};

// Child
function Child(age, name) {
  Parent.call(this, name);
  this.age = age;
}
Child.prototype = create(Parent.prototype);
Child.prototype.constructor = Child;
Child.prototype.sayAge = function () {
  console.log(this.age);
};
// es6 继承
// ES6 内部使用寄生组合式继承，首先用 Object.create 继承原型，
// 并传递第二个参数以将父类构造函数指向自身，同时设置数据属性描述符。
// 然后用 Object.setPrototypeOf 继承静态属性和静态方法。
const inherit = function (subType, superType) {
  // 对 superType 进行类型判断
  if (typeof superType !== "function" && superType !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subType.prototype = Object.create(superType && superType.prototype, {
    constructor: {
      configurable: true,
      enumerable: false,
      value: subType,
      writable: true,
    },
  });
  // 继承静态方法
  superType && Object.setPrototypeOf(subType, superType);
};
