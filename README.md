# browser.js
A tool for checking browsers and system versions.

## Installation
```shell
npm i browser.js -S
```

## Usage
```javascript
import Browser from 'browser.js'
```
or

```html
通过script标签引入

<script src="browser.js"></script>

<script>
  Browser.browser
</script>
```

## Value

### browser

说明：`返回浏览器名称`

### browserVersion

说明：`返回浏览器版本`

### os

说明：`返回操作系统`

### osVersion

说明：`返回操作系统版本`

### kernel

说明：`返回浏览器内核`

### device

说明：`返回当前设备类型`
<br/>
值：`Mobile、Tablet、PC`
