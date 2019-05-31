/*!
 * browser.js v0.2.0
 * (c) 2019-2019 Sorens
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Browser = factory());
}(this, function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  var OSSys = ['Windows', 'Linux', 'Android', 'Windows Phone', 'Ubuntu', 'FreeBSD', 'Debian', 'BlackBerry', 'MeeGo', 'Symbian']; // 修正配置

  var OSSysRevise = {
    'x11': 'Linux',
    'macintosh': 'Mac OS',
    'adr': 'Android',
    'like mac os x': 'iOS',
    'iemobile': 'Windows Phone',
    'rim': 'BlackBerry',
    'cros': 'Chrome OS',
    'hpwos': 'WebOS'
  };

  // 由于有些浏览器是给予IE或者chrome内核的 我们尽量把这两个关键字放到最下边
  // 使得浏览器自身的关键字优先级高 优先匹配
  // 例如在mac系统下Chrome浏览器信息也带有Safari字段 ， 需要将Safari优先级低于chrome
  var Browsers = ['Arora', 'Edge', 'Epiphany', 'Firefox', 'Iceape', 'Iceweasel', 'Kindle', 'Konqueror', 'Lunascape', 'Opera', 'QupZilla', 'SeaMonkey', 'Vivaldi', 'Chrome', 'Chromium', 'Safari'];
  var BrowsersRevise = {
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
    'maxthon': '傲游浏览器',
    'quark': '夸克浏览器',
    'miuibrowser': '小米浏览器',
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
    'silk/': 'Kindle',
    'yabrowser': 'Yandex',
    'crios': 'Chrome',
    'trident': 'IE',
    'msie': 'IE'
  };

  var NAV = window.navigator; // 按照惯例大写表示常量， 可这里我们希望UA可以实时更新

  var UA = ''; // 基本信息

  var BasicInfo =
  /*#__PURE__*/
  function () {
    // 参数可以是字符串或者数组
    function BasicInfo(useAgent) {
      classCallCheck(this, BasicInfo);

      this.useAgents = typeof useAgent === 'string' ? [useAgent] : useAgent;
    } // 处理结果


    createClass(BasicInfo, [{
      key: "getResult",
      value: function getResult() {
        var result = [];

        for (var i = 0, len = this.useAgents.length; i < len; i++) {
          var item = {};
          UA = this.useAgents[i];
          item.device = this.getDevice(); // 设备

          item.kernel = this.getKernel(); // 内核

          item.os = this.getOS(); // 操作系统

          item.browser = this.getBrowser(); // 浏览器

          revise360(item);
          item.osVersion = this.getOsVersion(item); // 操作系统版本

          item.browserVersion = this.getBrowserVersion(item); // 浏览器版本

          reviseKernel(item);
          result.push(item);
        }

        return result;
      } // 获取设备信息

    }, {
      key: "getDevice",
      value: function getDevice() {
        var device;

        if (UA.indexOf('mobi') > -1 || UA.indexOf('iph') > -1 || UA.indexOf('480') > -1) {
          device = 'Mobile';
        } else if (UA.indexOf('tablet') > -1 || UA.indexOf('pad') > -1 || UA.indexOf('nexus 7') > -1) {
          device = 'Tablet';
        } else {
          device = 'PC';
        }

        return device;
      } // 获取内核

    }, {
      key: "getKernel",
      value: function getKernel() {
        var kernel;

        if (UA.indexOf('trident') > -1 || UA.indexOf('net clr') > -1) {
          kernel = 'Trident';
        } else if (UA.indexOf('presto') > -1) {
          kernel = 'Presto';
        } else if (UA.indexOf('applewebkit') > -1) {
          kernel = 'WebKit';
        } else if (UA.indexOf('gecko/') > -1) {
          kernel = 'Gecko';
        }

        return kernel;
      } // 获取操作系统

    }, {
      key: "getOS",
      value: function getOS() {
        var os;

        for (var i = 0, len = OSSys.length; i < len; i++) {
          var item = OSSys[i];

          if (~UA.indexOf(OSSys[i].toLowerCase())) {
            os = item;
            break;
          }
        }

        if (!os) {
          for (var key in OSSysRevise) {
            var _item = OSSysRevise[key];

            if (~UA.indexOf(key)) {
              os = _item;
              break;
            }
          }
        } // 针对windows phone可二次修正


        return os;
      } // 获取浏览器信息

    }, {
      key: "getBrowser",
      value: function getBrowser() {
        var browser;

        for (var i = 0, len = Browsers.length; i < len; i++) {
          var item = Browsers[i];

          if (~UA.indexOf(Browsers[i].toLowerCase())) {
            browser = item;
            break;
          }
        }

        if (!browser || browser === 'Chrome' || browser === 'Chromium' || browser === 'Safari') {
          for (var key in BrowsersRevise) {
            var _item2 = BrowsersRevise[key];

            if (~UA.indexOf(key)) {
              browser = _item2;
              break;
            }
          }
        }

        return browser;
      } // 操作系统版本

    }, {
      key: "getOsVersion",
      value: function getOsVersion(item) {
        return osVersion[item.os]();
      } // 浏览器版本

    }, {
      key: "getBrowserVersion",
      value: function getBrowserVersion(item) {
        return browserVersion[item.browser]();
      }
    }]);

    return BasicInfo;
  }(); // 检测type


  function mime(option, value) {
    var mimeTypes = NAV.mimeTypes;

    for (var mt in mimeTypes) {
      if (mimeTypes[mt][option] === value) {
        return true;
      }
    }

    return false;
  } // mac 360极速


  function is360ByUserActivationProperty() {
    if (NAV.userActivation) {
      return false; // chrome
    } else {
        return true; // 360极速
      }
  } // 修正360浏览器


  function revise360(item) {
    var is360 = false;

    if (item.os === 'Windows') {
      var _chromeVision = Number(UA.replace(/^.*chrome\/([\d]+).*$/, '$1')); // 2345浏览器9.7版本会被误判为360极速


      var is2345 = UA.indexOf('2345explorer') > -1;

      if (_chromeVision > 45 && mime('type', 'application/vnd.chromium.remoting-viewer') && !is2345) {
        is360 = true;
      }
    } else if (item.os === 'Mac OS') {
      is360 = is360ByUserActivationProperty();
    }

    if (is360) {
      if (mime('type', 'application/gameplugin')) {
        item.browser = '360安全浏览器';
      } else {
        item.browser = '360极速浏览器';
      }
    }

    if (item.browser === 'IE' || item.browser === 'Edge') {
      var screenTop = window.screenTop - window.screenY;

      switch (screenTop) {
        case 73: // 无收藏栏

        case 96:
          // 有收藏栏
          item.browser = '360极速浏览器';
          break;

        case 75: // 无收藏栏

        case 105:
          // 有收藏栏
          item.browser = '360安全浏览器';
          break;
      }
    }
  } // 修正内核


  function reviseKernel(item) {
    if (item.browser === 'Chrome' && parseInt(item.browserVersion) > 27 || item.browser === 'Opera' && parseInt(item.browserVersion) > 12 || item.browser === 'Yandex') {
      item.kernel = 'Blink';
    }
  } // 获取chrome内核版本


  function chromeVision(edition) {
    var chromeVision = UA.replace(/^.*chrome\/([\d]+).*$/, '$1');
    return edition[chromeVision] || '';
  } // 系统版本信息


  var osVersion = {
    'Windows': function Windows() {
      var version = parseFloat(UA.replace(/^.*windows nt ([\d.]+).*$/, '$1'));
      var edition = {
        '5.0': '2000',
        '5.1': 'XP',
        '5.2': 'XP',
        '6.0': 'Vista',
        '6.1': '7',
        '6.2': '8',
        '6.3': '8.1',
        '6.4': '10'
      };
      return edition[version] || version;
    },
    'Mac OS': function MacOS() {
      return UA.replace(/^.*mac os x ([\d_]+).*$/, '$1').replace(/_/g, '.');
    },
    'Android': function Android() {
      return UA.replace(/^.*android ([\d.]+);.*$/, '$1');
    },
    'iOS': function iOS() {
      return UA.replace(/^.*os ([\d_]+) like.*$/, '$1').replace(/_/g, '.');
    },
    'Windows Phone': function WindowsPhone() {
      return UA.replace(/^.*windows phone( os)? ([\d.]+);.*$/, '$2');
    },
    'WebOS': function WebOS() {
      return UA.replace(/^.*hpwos\/([\d.]+);.*$/, '$1');
    },
    'Debian': function Debian() {
      return UA.replace(/^.*debian\/([\d.]+).*$/, '$1');
    }
  }; // 浏览器版本信息

  var browserVersion = {
    'Chrome': function Chrome() {
      return UA.replace(/^.*chrome\/([\d.]+).*$/, '$1').replace(/^.*crios\/([\d.]+).*$/, '$1');
    },
    'Chromium': function Chromium() {
      return UA.replace(/^.*chromium\/([\d.]+).*$/, '$1');
    },
    'Firefox': function Firefox() {
      return UA.replace(/^.*firefox\/([\d.]+).*$/, '$1').replace(/^.*fxios\/([\d.]+).*$/, '$1');
    },
    'Firefox Focus': function FirefoxFocus() {
      return UA.replace(/^.*focus\/([\d.]+).*$/, '$1');
    },
    'Safari': function Safari() {
      return UA.replace(/^.*version\/([\d.]+).*$/, '$1');
    },
    'Opera': function Opera() {
      return UA.replace(/^.*opera\/([\d.]+).*$/, '$1').replace(/^.*opr\/([\d.]+).*$/, '$1');
    },
    'IE': function IE() {
      return UA.replace(/^.*msie ([\d.]+).*$/, '$1').replace(/^.*rv:([\d.]+).*$/, '$1');
    },
    'Edge': function Edge() {
      return UA.replace(/^.*edge\/([\d.]+).*$/, '$1');
    },
    '360浏览器(手机版)': function _() {
      return UA.replace(/^.*qihoobrowser\/([\d.]+).*$/, '$1');
    },
    '360安全浏览器': function _() {
      var edition = {
        '21': '6.3',
        '31': '7.0',
        '42': '8.0',
        '45': '8.1',
        '55': '9.1',
        '63': '10.0'
      };
      return chromeVision(edition);
    },
    '360极速浏览器': function _() {
      var edition = {
        '30': '7.5',
        '50': '8.7',
        '55': '9.0',
        '63': '9.5',
        '69': '11.0'
      };
      return chromeVision(edition);
    },
    '搜狗浏览器': function _() {
      return UA.replace(/^.*se ([\d.x]+).*$/, '$1').replace(/^.*sogoumobilebrowser\/([\d.]+).*$/, '$1');
    },
    'QQ客户端': function QQ() {
      return UA.replace(/^.*qq\/([\d.]+).*$/, '$1');
    },
    'QQ浏览器': function QQ() {
      return UA.replace(/^.*qqbrowser\/([\d.]+).*$/, '$1');
    },
    'UC浏览器': function UC() {
      return UA.replace(/^.*uc?browser\/([\d.]+).*$/, '$1');
    },
    '猎豹浏览器': function _() {
      // 猎豹7 增加了lbbrowser后的版本
      if (/lbbrowser\/[\d+]/.test(UA)) {
        var lbVision = UA.replace(/^.*lbbrowser\/([\d]+).*$/, '$1');
        var _edition = {
          '10': '7.1'
        };
        return _edition[lbVision] || '';
      }

      var edition = {
        '21': '4.0',
        '29': '4.5',
        '34': '5.0',
        '39': '5.2',
        '42': '5.3',
        '46': '5.9',
        '49': '6.0',
        '57': '6.5',
        '63': '7.1'
      };
      return chromeVision(edition);
    },
    '世界之窗浏览器': function _() {
      return UA.replace(/^.*theworld ([\d.]+).*$/, '$1');
    },
    '百度浏览器': function _() {
      return UA.replace(/^.*bidubrowser[\s\/]([\d.]+).*$/, '$1');
    },
    '2345浏览器': function _() {
      return UA.replace(/^.*2345explorer\/([\d.]+).*$/, '$1');
    },
    '傲游浏览器': function _() {
      return UA.replace(/^.*maxthon\/([\d.]+).*$/, '$1');
    },
    '夸克浏览器': function _() {
      return UA.replace(/^.*quark\/([\d.]+).*$/, '$1');
    },
    '小米浏览器': function _() {
      return UA.replace(/^.*miuibrowser\/([\d.]+).*$/, '$1');
    },
    '旗鱼浏览器': function _() {
      return UA.replace(/^.*qiyu\/([\d.]+).*$/, '$1');
    },
    '淘宝浏览器': function _() {
      return UA.replace(/^.*taobrowser\/([\d.]+).*$/, '$1');
    },
    '淘宝手机客户端': function _() {
      return UA.replace(/^.*aliapp\(tb\/([\d.]+).*$/, '$1');
    },
    '天猫手机客户端': function _() {
      return UA.replace(/^.*aliapp\(tm\/([\d.]+).*$/, '$1');
    },
    '支付宝手机客户端': function _() {
      return UA.replace(/^.*aliapp\(ap\/([\d.]+).*$/, '$1');
    },
    '微信手机客户端': function _() {
      return UA.replace(/^.*micromessenger\/([\d.]+).*$/, '$1');
    },
    '微博手机客户端': function _() {
      return UA.replace(/^.*weibo__([\d.]+).*$/, '$1');
    },
    '豆瓣手机客户端': function _() {
      return UA.replace(/^.*com.douban.frodo\/([\d.]+).*$/, '$1');
    },
    '苏宁易购手机客户端': function _() {
      return UA.replace(/^.*snebuy-app([\d.]+).*$/, '$1');
    },
    '爱奇艺手机客户端': function _() {
      return UA.replace(/^.*iqiyiversion\/([\d.]+).*$/, '$1');
    },
    'Kindle': function Kindle() {
      return UA.replace(/^.*version\/([\d.]+).*$/, '$1');
    },
    'Arora': function Arora() {
      return UA.replace(/^.*arora\/([\d.]+).*$/, '$1');
    },
    'Vivaldi': function Vivaldi() {
      return UA.replace(/^.*vivaldi\/([\d.]+).*$/, '$1');
    },
    'Yandex': function Yandex() {
      return UA.replace(/^.*yabrowser\/([\d.]+).*$/, '$1');
    },
    'Lunascape': function Lunascape() {
      return UA.replace(/^.*lunascape[\/\s]([\d.]+).*$/, '$1');
    },
    'QupZilla': function QupZilla() {
      return UA.replace(/^.*qupzilla[\/\s]([\d.]+).*$/, '$1');
    },
    'COCCOC': function COCCOC() {
      return UA.replace(/^.*coc_coc_browser\/([\d.]+).*$/, '$1');
    },
    'Iceweasel': function Iceweasel() {
      return UA.replace(/^.*iceweasel\/([\d.]+).*$/, '$1');
    },
    'Konqueror': function Konqueror() {
      return UA.replace(/^.*konqueror\/([\d.]+).*$/, '$1');
    },
    'Iceape': function Iceape() {
      return UA.replace(/^.*iceape\/([\d.]+).*$/, '$1');
    },
    'SeaMonkey': function SeaMonkey() {
      return UA.replace(/^.*seamonkey\/([\d.]+).*$/, '$1');
    },
    'Epiphany': function Epiphany() {
      return UA.replace(/^.*epiphany\/([\d.]+).*$/, '$1');
    }
  };
  var basicInfo = new BasicInfo(NAV.userAgent.toLowerCase()); // the test
  // const basicInfo = new BasicInfo([NAV.userAgent.toLowerCase(),
  //   'Opera/9.80 (Windows NT 6.1) Presto/2.12.388 Version/12.15'.toLowerCase(),
  //   'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.57 Safari/537.17 SE 2.X MetaSr 1.0'.toLowerCase()
  // ])
  // result = basicInfo.getResult()[2]

  var Result = basicInfo.getResult()[0];
  window.Browser = Result;

  return Result;

}));
/** Fri May 31 2019 16:21:22 GMT+0800 (CST) **/
