const { AsyncSeriesHook } = require("tapable");

class Hook {
  constructor() {
    this.hooks = {
      asyncSeriesHook: new AsyncSeriesHook(["parameter"]),
    };
  }
  start = (parameter, endedCallback) => {
    this.hooks.asyncSeriesHook.promise(parameter).then(endedCallback);
  };
}

const hook = new Hook();

hook.hooks.asyncSeriesHook.tapPromise("hook1", (parameter) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("任务一", parameter);
      resolve(true);
    }, 2000);
  });
});
hook.hooks.asyncSeriesHook.tapPromise("hook2", (parameter) => {
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
