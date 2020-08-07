const { AsyncParallelHook } = require("tapable");

class Hook {
  constructor() {
    this.hooks = {
      asyncParallelHook: new AsyncParallelHook(["parameter"]),
    };
  }
  start = (parameter, endedCallback) => {
    this.hooks.asyncParallelHook.promise(parameter).then(endedCallback);
  };
}

const hook = new Hook();

hook.hooks.asyncParallelHook.tapPromise("hook1", (parameter) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("任务一", parameter);
      resolve();
    }, 2000);
  });
});
hook.hooks.asyncParallelHook.tapPromise("hook2", (parameter) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("任务二", parameter);
      resolve();
    }, 2000);
  });
});

hook.start("启动", () => {
  console.log("结束");
});
