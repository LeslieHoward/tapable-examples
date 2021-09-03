const { AsyncSeriesHook } = require("tapable");

class Hook {
  constructor() {
    this.hooks = {
      asyncSeriesHook: new AsyncSeriesHook(["parameter"]),
    };
  }
  start = (parameter, endedCallback) => {
    this.hooks.asyncSeriesHook.callAsync(parameter, endedCallback);
  };
}

const hook = new Hook();

hook.hooks.asyncSeriesHook.tapAsync("hook1", (parameter, callback) => {
  setTimeout(() => {
    console.log("任务一", parameter);
    // 返回参数为非falsy，则忽略余下插件的执行
    callback(true);
  }, 2000);
});
hook.hooks.asyncSeriesHook.tapAsync("hook2", (parameter, callback) => {
  setTimeout(() => {
    console.log("任务二", parameter);
    callback();
  }, 2000);
});

hook.start("启动", () => {
  console.log("结束");
});

/**
 * 执行结果
 * 1. 任务一 启动
 * 2. 结束
 */
