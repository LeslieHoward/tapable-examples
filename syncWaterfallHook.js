const { SyncWaterfallHook } = require("tapable");

class Hook {
  constructor() {
    this.hooks = {
      syncWaterfallHook: new SyncWaterfallHook(["parameter"]),
    };
  }
  start = (parameter) => {
    this.hooks.syncWaterfallHook.call(parameter);
  };
}

const hook = new Hook();

hook.hooks.syncWaterfallHook.tap("hook1", (parameter) => {
  console.log("任务一", parameter);
  return "传给任务二的参数";
});
hook.hooks.syncWaterfallHook.tap("hook2", (parameter) => {
  console.log("任务二", parameter);
  return "传给任务三的参数";
});
hook.hooks.syncWaterfallHook.tap("hook3", (parameter) => {
  console.log("任务三", parameter);
});

hook.start("启动");

/**
 * 执行结果
 * 任务一 启动
 * 任务二 传给任务二的参数
 * 任务三 传给任务三的参数
 */
