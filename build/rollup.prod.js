const version = require('../package.json').version

// 设置头部注释信息
const banner =
    '/*!\n' +
    ` * browser.js v${version}\n` +
    ` * (c) 2019-${new Date().getFullYear()} Sorens\n` +
    ' * Released under the MIT License.\n' +
    ' */'

// 设置尾部注释信息
const footer = `/** ${new Date()} **/`

module.exports = {
  output: {
    file: 'dist/browser.js',
    format: 'umd',
    name: 'Browser',
    banner,
    footer
  }
}
