const { SyncLoopHook } = require("tapable");

class Hook {
  constructor() {
    this.hooks = {
      syncLoopHook: new SyncLoopHook(["parameter"]),
    };
  }
  start = (parameter) => {
    this.hooks.syncLoopHook.call(parameter);
  };
}

const hook = new Hook();
let index = 1;

hook.hooks.syncLoopHook.tap("hook1", (parameter) => {
  console.log(`${parameter} ${index} 次`);
  if (index < 5) {
    index += 1;
    return true;
  }
});
hook.hooks.syncLoopHook.tap("hook2", (parameter) => {
  console.log(`${parameter} ${index} 次`);
  if (index < 5) {
    index += 1;
    return true;
  }
});

hook.start("启动");

/**
 * 执行结果
 * 启动 1 次
 * 启动 2 次
 * 启动 3 次
 * 启动 4 次
 * 启动 5 次
 * 启动 5 次
 */
