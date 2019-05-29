const rollup = require('rollup')
const base = require('./rollup.base')

// 初始化配置文件
const watcher = rollup.watch(base)

watcher.on('event', event => {
  // 状态码
  console.log(event.code)
})