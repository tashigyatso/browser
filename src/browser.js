import { UA, chromeVision } from './utils.js'

// 由于有些浏览器是给予IE或者chrome内核的 我们尽量把这两个关键字放到最下边
// 使得浏览器自身的关键字优先级高 优先匹配
// 例如在mac系统下Chrome浏览器信息也带有Safari字段 ， 需要将Safari优先级低于chrome
export const Browsers = [
  'Arora',
  'Edge',
  'Epiphany',
  'Firefox',
  'Iceape',
  'Iceweasel',
  'Kindle',
  'Konqueror',
  'Lunascape',
  'Opera',
  'QupZilla',
  'SeaMonkey',
  'Vivaldi',
  'Chrome',
  'Chromium',
  'Safari'
]

export const BrowsersRevise = {
  'fxios': 'Firefox',
  'focus': 'Firefox Focus',
  'opr': 'Opera',
  'qihoobrowser': '360浏览器(手机版)',
  'qhbrowser': '360浏览器(手机版)',
  '360se': '360安全浏览器',
  '360ee': '360极速浏览器',
  'sogou': '搜狗浏览器',
  'metasr': '搜狗浏览器',
  'qq/': 'QQ客户端',
  'qqbrowser': 'QQ浏览器',
  'uc': 'UC浏览器',
  'ubrowser': 'UC浏览器',
  'lbbrowser': '猎豹浏览器',
  'theworld': '世界之窗浏览器',
  'baidu': '百度浏览器',
  'bidubrowser': '百度浏览器',
  '2345explorer': '2345浏览器',
  'mb2345browser': '2345浏览器手机版',
  'maxthon': '傲游浏览器',
  'quark': '夸克浏览器',
  'miuibrowser': '小米浏览器',
  'build/huawei': '华为浏览器',
  'qiyu': '旗鱼浏览器',
  'taobrowser': '淘宝浏览器',
  'aliapp(tb': '淘宝手机客户端',
  'aliapp(tm': '天猫手机客户端',
  'aliapp(ap': '支付宝手机客户端',
  'micromessenger': '微信手机客户端',
  'weibo': '微博手机客户端',
  'com.douban.frodo': '豆瓣手机客户端',
  'snebuy-app': '苏宁易购手机客户端',
  'iqiyiapp': '爱奇艺手机客户端',
  'dingtalk': '钉钉手机客户端',
  'silk/': 'Kindle',
  'yabrowser': 'Yandex',
  'crios': 'Chrome',
  'trident': 'IE',
  'msie': 'IE'
}

// 浏览器版本信息
export const BrowserVersion = {
  'Chrome'() {
    return UA.replace(/^.*chrome\/([\d.]+).*$/, '$1').replace(/^.*crios\/([\d.]+).*$/, '$1')
  },
  'Chromium'() {
    return UA.replace(/^.*chromium\/([\d.]+).*$/, '$1')
  },
  'Firefox'() {
    return UA.replace(/^.*firefox\/([\d.]+).*$/, '$1').replace(/^.*fxios\/([\d.]+).*$/, '$1')
  },
  'Firefox Focus'() {
    return UA.replace(/^.*focus\/([\d.]+).*$/, '$1')
  },
  'Safari'() {
    return UA.replace(/^.*version\/([\d.]+).*$/, '$1')
  },
  'Opera'() {
    return UA.replace(/^.*opera\/([\d.]+).*$/, '$1').replace(/^.*opr\/([\d.]+).*$/, '$1')
  },
  'IE'() {
    return UA.replace(/^.*msie ([\d.]+).*$/, '$1').replace(/^.*rv:([\d.]+).*$/, '$1')
  },
  'Edge'() {
    return UA.replace(/^.*edge\/([\d.]+).*$/, '$1')
  },
  '360浏览器(手机版)'() {
    return UA.replace(/^.*qihoobrowser\/([\d.]+).*$/, '$1')
  },
  '360安全浏览器'() {
    const edition = {
      '21': '6.3',
      '31': '7.0',
      '42': '8.0',
      '45': '8.1',
      '55': '9.1',
      '63': '10.0'
    }
    return chromeVision(edition)
  },
  '360极速浏览器'() {
    const edition = {
      '30': '7.5',
      '50': '8.7',
      '55': '9.0',
      '63': '9.5',
      '69': '11.0'
    }
    return chromeVision(edition)
  },
  '搜狗浏览器'() {
    const edition = {
      '24': '4.1',
      '28': '4.2',
      '31': '5.0',
      '35': '5.1',
      '38': '5.3',
      '49': '6.3',
      '58': '8.5'
    }
    return chromeVision(edition)
  },
  'QQ客户端'() {
    return UA.replace(/^.*qq\/([\d.]+).*$/, '$1')
  },
  'QQ浏览器'() {
    return UA.replace(/^.*qqbrowser\/([\d.]+).*$/, '$1')
  },
  'UC浏览器'() {
    return UA.replace(/^.*uc?browser\/([\d.]+).*$/, '$1')
  },
  '猎豹浏览器'() {
    // 猎豹7 增加了lbbrowser后的版本
    if (/lbbrowser\/[\d+]/.test(UA)) {
      const lbVision = UA.replace(/^.*lbbrowser\/([\d]+).*$/, '$1')
      const edition = {
        '10': '7.1'
      }
      return edition[lbVision] || ''
    }
    const edition = {
      '21': '4.0',
      '29': '4.5',
      '34': '5.0',
      '39': '5.2',
      '42': '5.3',
      '46': '5.9',
      '49': '6.0',
      '57': '6.5',
      '63': '7.1'
    }
    return chromeVision(edition)
  },
  '世界之窗浏览器'() {
    return UA.replace(/^.*theworld ([\d.]+).*$/, '$1')
  },
  '百度浏览器'() {
    return UA.replace(/^.*bidubrowser[\s\/]([\d.]+).*$/, '$1')
  },
  '2345浏览器'() {
    const edition = {
      '55': '9.9',
      '69': '10.0'
    }
    return chromeVision(edition) || UA.replace(/^.*2345explorer\/([\d.]+).*$/, '$1')
  },
  '2345浏览器手机版'() {
    const edition = {
      '55': '9.9',
      '69': '10.0'
    }
    return chromeVision(edition) || UA.replace(/^.*mb2345browser\/([\d.]+).*$/, '$1')
  },
  '傲游浏览器'() {
    return UA.replace(/^.*maxthon\/([\d.]+).*$/, '$1')
  },
  '夸克浏览器'() {
    return UA.replace(/^.*quark\/([\d.]+).*$/, '$1')
  },
  '小米浏览器'() {
    return UA.replace(/^.*miuibrowser\/([\d.]+).*$/, '$1')
  },
  '华为浏览器'() {
    return UA.replace(/^.*version\/([\d.]+).*$/, '$1')
  },
  '旗鱼浏览器'() {
    return UA.replace(/^.*qiyu\/([\d.]+).*$/, '$1')
  },
  '淘宝浏览器'() {
    return UA.replace(/^.*taobrowser\/([\d.]+).*$/, '$1')
  },
  '淘宝手机客户端'() {
    return UA.replace(/^.*aliapp\(tb\/([\d.]+).*$/, '$1')
  },
  '天猫手机客户端'() {
    return UA.replace(/^.*aliapp\(tm\/([\d.]+).*$/, '$1')
  },
  '支付宝手机客户端'() {
    return UA.replace(/^.*aliapp\(ap\/([\d.]+).*$/, '$1')
  },
  '微信手机客户端'() {
    return UA.replace(/^.*micromessenger\/([\d.]+).*$/, '$1')
  },
  '微博手机客户端'() {
    return UA.replace(/^.*weibo__([\d.]+).*$/, '$1')
  },
  '钉钉手机客户端'() {
    return UA.replace(/^.*dingtalk\/([\d.]+).*$/, '$1')
  },
  '豆瓣手机客户端'() {
    return UA.replace(/^.*com.douban.frodo\/([\d.]+).*$/, '$1')
  },
  '苏宁易购手机客户端'() {
    return UA.replace(/^.*snebuy-app([\d.]+).*$/, '$1')
  },
  '爱奇艺手机客户端'() {
    return UA.replace(/^.*iqiyiversion\/([\d.]+).*$/, '$1')
  },
  'Kindle'() {
    return UA.replace(/^.*version\/([\d.]+).*$/, '$1')
  },
  'Arora'() {
    return UA.replace(/^.*arora\/([\d.]+).*$/, '$1')
  },
  'Vivaldi'() {
    return UA.replace(/^.*vivaldi\/([\d.]+).*$/, '$1')
  },
  'Yandex'() {
    return UA.replace(/^.*yabrowser\/([\d.]+).*$/, '$1')
  },
  'Lunascape'() {
    return UA.replace(/^.*lunascape[\/\s]([\d.]+).*$/, '$1')
  },
  'QupZilla'() {
    return UA.replace(/^.*qupzilla[\/\s]([\d.]+).*$/, '$1')
  },
  'COCCOC'() {
    return UA.replace(/^.*coc_coc_browser\/([\d.]+).*$/, '$1')
  },
  'Iceweasel'() {
    return UA.replace(/^.*iceweasel\/([\d.]+).*$/, '$1')
  },
  'Konqueror'() {
    return UA.replace(/^.*konqueror\/([\d.]+).*$/, '$1')
  },
  'Iceape'() {
    return UA.replace(/^.*iceape\/([\d.]+).*$/, '$1')
  },
  'SeaMonkey'() {
    return UA.replace(/^.*seamonkey\/([\d.]+).*$/, '$1')
  },
  'Epiphany'() {
    return UA.replace(/^.*epiphany\/([\d.]+).*$/, '$1')
  }
}
