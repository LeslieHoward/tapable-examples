const { AsyncSeriesBailHook } = require("tapable");

class Hook {
  constructor() {
    this.hooks = {
      asyncSeriesBailHook: new AsyncSeriesBailHook(["parameter"]),
    };
  }
  start = (parameter, endedCallback) => {
    this.hooks.asyncSeriesBailHook.promise(parameter).then(endedCallback);
  };
}

const hook = new Hook();

hook.hooks.asyncSeriesBailHook.tapPromise("hook1", (parameter) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("任务一", parameter);
      // resolve();
      resolve(true);
    }, 2000);
  });
});
hook.hooks.asyncSeriesBailHook.tapPromise("hook2", (parameter) => {
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

/**
 * 执行结果
 * 1. 任务一 启动
 * 2. 结束
 */
