const { AsyncParallelHook } = require("tapable");

class Hook {
  constructor() {
    this.hooks = {
      asyncParallelHook: new AsyncParallelHook(["parameter"]),
    };
  }
  start = (parameter, endedCallback) => {
    this.hooks.asyncParallelHook.callAsync(parameter, endedCallback);
  };
}

const hook = new Hook();

hook.hooks.asyncParallelHook.tapAsync("hook1", (parameter, callback) => {
  setTimeout(() => {
    console.log("任务一", parameter);
    callback();
  }, 2000);
});
hook.hooks.asyncParallelHook.tapAsync("hook2", (parameter, callback) => {
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
 * 2. 任务二 启动
 * 3. 结束
 */