const { SyncHook } = require("tapable");

class Hook {
  constructor() {
    this.hooks = {
      syncHook: new SyncHook(["parameter"]),
    };
  }
  start = (parameter) => {
    this.hooks.syncHook.call(parameter);
  };
}

const hook = new Hook();

hook.hooks.syncHook.tap("hook1", (parameter) => {
  console.log("参数", parameter);
});

hook.start("启动");

/**
 * 执行结果
 * 1. 参数 启动
 */
