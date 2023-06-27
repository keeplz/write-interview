class Scheduler2 {}
class Scheduler {
  maxCount;
  runningCount = 0;
  queue = [];
  constructor(maxCount = Infinity) {
    this.maxCount = maxCount;
  }
  add(f) {
    this.queue.push(
      () =>
        new Promise((resolve) => {
          const res = f();
          if (typeof res.then === "function") {
            res.then(resolve);
          } else {
            resolve(res);
          }
        })
    );
  }
  startTask() {
    const count = Math.min(
      this.maxCount - this.runningCount,
      this.queue.length
    );
    for (let i = 0; i < count; i++) {
      this.request();
    }
  }
  request() {
    this.runningCount++;
    const task = this.queue.shift();
    task().then(() => {
      this.runningCount--;
      this.startTask();
    });
  }
}

const s = new Scheduler2(2);
const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const addTask = (time, order) => {
  s.add(() => timeout(time).then(() => console.log(order)));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
s.startTask();
