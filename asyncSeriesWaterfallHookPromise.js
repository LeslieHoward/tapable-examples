const { AsyncSeriesWaterfallHook } = require("tapable");

class Hook {
  constructor() {
    this.hooks = {
      asyncSeriesWaterfallHook: new AsyncSeriesWaterfallHook(["parameter"]),
    };
  }
  start = (parameter, endedCallback) => {
    this.hooks.asyncSeriesWaterfallHook.promise(parameter).then(endedCallback);
  };
}

const hook = new Hook();

hook.hooks.asyncSeriesWaterfallHook.tapPromise("hook1", (parameter) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("任务一", parameter);
      resolve("任务二的参数");
    }, 2000);
  });
});
hook.hooks.asyncSeriesWaterfallHook.tapPromise("hook2", (parameter) => {
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
