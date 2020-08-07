const { AsyncParallelBailHook } = require("tapable");

class Hook {
  constructor() {
    this.hooks = {
      asyncParallelBailHook: new AsyncParallelBailHook(["parameter"]),
    };
  }
  start = (parameter, endedCallback) => {
    this.hooks.asyncParallelBailHook.promise(parameter).then(endedCallback);
  };
}

const hook = new Hook();

hook.hooks.asyncParallelBailHook.tapPromise("hook1", (parameter) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("任务一", parameter);
      resolve(true);
    }, 2000);
  });
});
hook.hooks.asyncParallelBailHook.tapPromise("hook2", (parameter) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("任务二", parameter);
      resolve(true);
    }, 2000);
  });
});

hook.start("启动", () => {
  console.log("结束");
});
