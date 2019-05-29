const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const { eslint } = require('rollup-plugin-eslint')

module.exports = {
  // 打包入口
  input: 'src/index.js',
  // 插件
  plugins: [
    // eslint检查
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**'],
      exclude: ['node_modules/**']
    }),
    resolve(),
    commonjs(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: ['@babel/env'],
      plugins: [
        '@babel/external-helpers',
        '@babel/transform-runtime'
      ],
      externalHelpers: true,
      runtimeHelpers: true
    })
  ]
}
