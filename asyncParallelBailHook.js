const { AsyncParallelBailHook } = require("tapable");

class Hook {
  constructor() {
    this.hooks = {
      asyncParallelBailHook: new AsyncParallelBailHook(["parameter"]),
    };
  }
  start = (parameter, endedCallback) => {
    this.hooks.asyncParallelBailHook.callAsync(parameter, endedCallback);
  };
}

const hook = new Hook();

hook.hooks.asyncParallelBailHook.tapAsync("hook1", (parameter, callback) => {
  setTimeout(() => {
    console.log("任务一", parameter);
    // 返回非undefined的参数，则直接执行最终回调
    callback(true);
  }, 2000);
});
hook.hooks.asyncParallelBailHook.tapAsync("hook2", (parameter, callback) => {
  setTimeout(() => {
    console.log("任务二", parameter);
    callback(true);
  }, 2000);
});

hook.start("启动", () => {
  console.log("结束");
});

/**
 * 执行结果
 * 1. 任务一 启动
 * 2. 结束
 * 3. 任务二 启动
 */
