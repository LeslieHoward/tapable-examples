const { AsyncSeriesBailHook } = require("tapable");

class Hook {
  constructor() {
    this.hooks = {
      asyncSeriesBailHook: new AsyncSeriesBailHook(["parameter"]),
    };
  }
  start = (parameter, endedCallback) => {
    this.hooks.asyncSeriesBailHook.callAsync(parameter, endedCallback);
  };
}

const hook = new Hook();

hook.hooks.asyncSeriesBailHook.tapAsync("hook1", (parameter, callback) => {
  setTimeout(() => {
    console.log("任务一", parameter);
    callback(true);
  }, 2000);
});
hook.hooks.asyncSeriesBailHook.tapAsync("hook2", (parameter, callback) => {
  setTimeout(() => {
    console.log("任务二", parameter);
    callback();
  }, 2000);
});

hook.start("启动", () => {
  console.log("结束");
});
