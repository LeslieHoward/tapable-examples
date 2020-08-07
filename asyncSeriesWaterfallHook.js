const { AsyncSeriesWaterfallHook } = require("tapable");

class Hook {
  constructor() {
    this.hooks = {
      asyncSeriesWaterfallHook: new AsyncSeriesWaterfallHook(["parameter"]),
    };
  }
  start = (parameter, endedCallback) => {
    this.hooks.asyncSeriesWaterfallHook.callAsync(parameter, endedCallback);
  };
}

const hook = new Hook();

hook.hooks.asyncSeriesWaterfallHook.tapAsync("hook1", (parameter, callback) => {
  setTimeout(() => {
    console.log("任务一", parameter);
    callback(null, '任务二的参数');
  }, 2000);
});
hook.hooks.asyncSeriesWaterfallHook.tapAsync("hook2", (parameter, callback) => {
  setTimeout(() => {
    console.log("任务二", parameter);
    callback();
  }, 2000);
});

hook.start("启动", () => {
  console.log("结束");
});
