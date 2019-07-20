import { UA, revise360, reviseKernel } from './utils.js'
import { OSSys, OSSysRevise, OsVersion } from './os.js'
import { Browsers, BrowsersRevise, BrowserVersion } from './browser.js'

class BrowserBasic {
  // 获取设备信息
  getDevice() {
    let device
    if (UA.indexOf('mobi') > -1 || UA.indexOf('iph') > -1 || UA.indexOf('480') > -1) {
      device = 'Mobile'
    } else if (UA.indexOf('tablet') > -1 || UA.indexOf('pad') > -1 || UA.indexOf('nexus 7') > -1) {
      device = 'Tablet'
    } else {
      device = 'PC'
    }
    return device
  }

  // 获取内核
  getKernel() {
    let kernel
    if (UA.indexOf('trident') > -1 || UA.indexOf('net clr') > -1) {
      kernel = 'Trident'
    } else if (UA.indexOf('presto') > -1) {
      kernel = 'Presto'
    } else if (UA.indexOf('applewebkit') > -1) {
      kernel = 'WebKit'
    } else if (UA.indexOf('gecko/') > -1) {
      kernel = 'Gecko'
    }
    return kernel
  }

  // 获取操作系统
  getOS() {
    let os
    for (let i = 0, len = OSSys.length; i < len; i++) {
      const item = OSSys[i]
      if (~UA.indexOf(OSSys[i].toLowerCase())) {
        os = item
        break
      }
    }
    if (!os) {
      for (const key in OSSysRevise) {
        const item = OSSysRevise[key]
        if (~UA.indexOf(key)) {
          os = item
          break
        }
      }
    }
    // 针对windows phone可二次修正
    return os
  }

  // 获取浏览器信息
  getBrowser() {
    let browser
    for (let i = 0, len = Browsers.length; i < len; i++) {
      const item = Browsers[i]
      if (~UA.indexOf(Browsers[i].toLowerCase())) {
        browser = item
        break
      }
    }
    if (!browser || browser === 'Chrome' || browser === 'Chromium' || browser === 'Safari') {
      for (const key in BrowsersRevise) {
        const item = BrowsersRevise[key]
        if (~UA.indexOf(key)) {
          browser = item
          break
        }
      }
    }
    return browser
  }

  // 操作系统版本
  getOsVersion(item) {
    return OsVersion[item.os]()
  }

  // 浏览器版本
  getBrowserVersion(item) {
    return BrowserVersion[item.browser]()
  }
}

class Browser extends BrowserBasic {
  // 处理结果
  getResult() {
    const result = {}

    result.device = this.getDevice() // 设备
    result.kernel = this.getKernel() // 内核
    result.os = this.getOS() // 操作系统
    result.browser = this.getBrowser() // 浏览器
    revise360(result)
    result.osVersion = this.getOsVersion(result) // 操作系统版本
    result.browserVersion = this.getBrowserVersion(result) // 浏览器版本
    reviseKernel(result)

    return result
  }
}

const browser = new Browser()

window.Browser = browser.getResult()

export default window.Browser
