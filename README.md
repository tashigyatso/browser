# browser-checking
A tool for checking browsers and system versions.

## Installation
```shell
npm i browser-checking -S
```

## Usage
```javascript
import Browser from 'browser-checking'
```
or

```html
通过script标签引入

<script src="browser.js"></script>
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

## 引用
```javascript
const basicInfo = new BasicInfo([NAV.userAgent.toLowerCase(),
  'Opera/9.80 (Windows NT 6.1) Presto/2.12.388 Version/12.15'.toLowerCase(),
  'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.57 Safari/537.17 SE 2.X MetaSr 1.0'.toLowerCase()
])
const Result = basicInfo.getResult()[2]
```
