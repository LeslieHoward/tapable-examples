const { SyncBailHook } = require("tapable");

class Hook {
  constructor() {
    this.hooks = {
      syncBailHook: new SyncBailHook(["parameter"]),
    };
  }
  start = (parameter) => {
    this.hooks.syncBailHook.call(parameter);
  };
}

const hook = new Hook();

hook.hooks.syncBailHook.tap("hook1", (parameter) => {
  console.log("任务一", parameter);
});
hook.hooks.syncBailHook.tap("hook2", (parameter) => {
  console.log("任务二", parameter);
  // 返回非undefined，终止执行余下注册的插件
  return true;
});
hook.hooks.syncBailHook.tap("hook3", (parameter) => {
  console.log("任务三", parameter);
});

hook.start("启动");
