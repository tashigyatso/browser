const rollup = require('rollup')
const base = require('./rollup.base')
const prod = require('./rollup.prod')
const prodMin = require('./rollup.prod.min')

function getSize(code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

async function build(inputOptions, outputOptions) {
  if (outputOptions.plugins) {
    inputOptions.plugins = inputOptions.plugins.concat(outputOptions.plugins)
  }
  const bundle = await rollup.rollup(inputOptions)
  // 通过generate拿到code代码 ，计算代码大小
  const {output: [{code}]} = await bundle.generate(outputOptions)
  console.log(outputOptions.output.file + ':' + getSize(code))

  await bundle.write(outputOptions)
}

build(base, prod)

build(base, prodMin)
