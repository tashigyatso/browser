/*!
 * browser.js v0.1.0
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

  var NAV = window.navigator; // const UA = NAV.userAgent.toLowerCase()
  // 按照惯例大写表示常量， 可这里我们希望UA可以实时更新

  var UA = ''; // 检测结果

  var result = {
    browser: '',
    // 浏览器
    browserVersion: '',
    // 浏览器版本
    os: '',
    // 操作系统
    osVersion: '',
    // 操作系统版本
    kernel: '',
    // 内核
    device: '' // 设备

  };
  var OSSys = ['Windows', 'Linux', 'Android', 'Windows Phone', 'Ubuntu', 'FreeBSD', 'Debian', 'BlackBerry', 'MeeGo', 'Symbian']; // 修正配置

  var OSSysRevise = {
    'x11': 'Linux',
    'macintosh': 'Mac OS',
    'adr': 'Android',
    'like mac os x': 'iOS',
    'iemobile': 'Windows Phone',
    'rim': 'BlackBerry',
    'cros': 'Chrome OS',
    'hpwos': 'WebOS' // 基本信息

  };

  var BasicInfo =
  /*#__PURE__*/
  function () {
    // 参数可以是字符串或者数组
    function BasicInfo(useAgent) {
      classCallCheck(this, BasicInfo);

      this.useAgent = typeof useAgent === 'string' ? [useAgent] : useAgent;
      this.result = null;
      this.curUse = {};
    }

    createClass(BasicInfo, [{
      key: "getResult",
      value: function getResult() {
        var _this = this;

        var result = [];
        this.useAgent.forEach(function (element) {
          var item = {};
          UA = element;
          item.device = _this.getDevice();
          item.kernel = _this.getKernel();
          item.os = _this.getOS();
          item.browser = _this.getBrowser();
          result.push(item);
        });
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

        if (UA.indexOf('chrome') > -1 || UA.indexOf('crios') > -1) {
          browser = 'Chrome';
        } else if (UA.indexOf('chromium') > -1) {
          browser = 'Chromium';
        } else if (UA.indexOf('msie') > -1 || UA.indexOf('trident') > -1) {
          browser = 'IE';
        } else if (UA.indexOf('firefox') > -1 || UA.indexOf('fxios') > -1) {
          browser = 'Firefox';
        } else if (UA.indexOf('focus') > -1) {
          browser = 'Firefox Focus';
        } else if (UA.indexOf('safari') > -1) {
          browser = 'Safari';
        } else if (UA.indexOf('opera') > -1 || UA.indexOf('opr') > -1) {
          browser = 'Opera';
        }

        if (UA.indexOf('edge') > -1) {
          browser = 'Edge';
        } else if (UA.indexOf('qihoobrowser') > -1 || UA.indexOf('qhbrowser') > -1) {
          browser = '360浏览器(手机版)';
        } else if (UA.indexOf('360se') > -1) {
          browser = '360安全浏览器';
        } else if (UA.indexOf('360ee') > -1) {
          browser = '360极速浏览器';
        } else if (UA.indexOf('sogou') > -1 || UA.indexOf('metasr') > -1) {
          browser = '搜狗浏览器';
        } else if (UA.indexOf('qq/') > -1) {
          browser = 'QQ客户端';
        } else if (UA.indexOf('qqbrowser') > -1) {
          browser = 'QQ浏览器';
        } else if (UA.indexOf('uc') > -1 || UA.indexOf('ubrowser') > -1) {
          browser = 'UC浏览器';
        } else if (UA.indexOf('lbbrowser') > -1) {
          browser = '猎豹浏览器';
        } else if (UA.indexOf('theworld') > -1) {
          browser = '世界之窗浏览器';
        } else if (UA.indexOf('baidu') > -1 || UA.indexOf('bidubrowser') > -1) {
          browser = '百度浏览器';
        } else if (UA.indexOf('2345explorer') > -1) {
          browser = '2345浏览器';
        } else if (UA.indexOf('maxthon') > -1) {
          browser = '傲游浏览器';
        } else if (UA.indexOf('quark') > -1) {
          browser = '夸克浏览器';
        } else if (UA.indexOf('miuibrowser') > -1) {
          browser = '小米浏览器';
        } else if (UA.indexOf('qiyu') > -1) {
          browser = '旗鱼浏览器';
        } else if (UA.indexOf('taobrowser') > -1) {
          browser = '淘宝浏览器';
        } else if (UA.indexOf('aliapp(tb') > -1) {
          browser = '淘宝手机客户端';
        } else if (UA.indexOf('aliapp(tm') > -1) {
          browser = '天猫手机客户端';
        } else if (UA.indexOf('aliapp(ap') > -1) {
          browser = '支付宝手机客户端';
        } else if (UA.indexOf('micromessenger') > -1) {
          browser = '微信手机客户端';
        } else if (UA.indexOf('weibo') > -1) {
          browser = '微博手机客户端';
        } else if (UA.indexOf('com.douban.frodo') > -1) {
          browser = '豆瓣手机客户端';
        } else if (UA.indexOf('snebuy-app') > -1) {
          browser = '苏宁易购手机客户端';
        } else if (UA.indexOf('iqiyiapp') > -1) {
          browser = '爱奇艺手机客户端';
        } else if (UA.indexOf('kindle') > -1 || UA.indexOf('silk/') > -1) {
          browser = 'Kindle';
        } else if (UA.indexOf('arora') > -1) {
          browser = 'Arora';
        } else if (UA.indexOf('vivaldi') > -1) {
          browser = 'Vivaldi';
        } else if (UA.indexOf('yabrowser') > -1) {
          browser = 'Yandex';
        } else if (UA.indexOf('lunascape') > -1) {
          browser = 'Lunascape';
        } else if (UA.indexOf('qupzilla') > -1) {
          browser = 'QupZilla';
        } else if (UA.indexOf('coc_coc_browser') > -1) {
          browser = 'COCCOC';
        } else if (UA.indexOf('iceape') > -1) {
          browser = 'Iceape';
        } else if (UA.indexOf('iceweasel') > -1) {
          browser = 'Iceweasel';
        } else if (UA.indexOf('konqueror') > -1) {
          browser = 'Konqueror';
        } else if (UA.indexOf('seamonkey') > -1) {
          browser = 'SeaMonkey';
        } else if (UA.indexOf('epiphany') > -1) {
          browser = 'Epiphany';
        }

        return browser;
      }
    }]);

    return BasicInfo;
  }();

  var basicInfo = new BasicInfo(NAV.userAgent.toLowerCase());
  result = basicInfo.getResult()[0]; // result.kernel = basicInfo.getKernel()
  // result.os = basicInfo.getOS()
  // result.browser = basicInfo.getBrowser()

  function mime(option, value) {
    var mimeTypes = NAV.mimeTypes;

    for (var mt in mimeTypes) {
      if (mimeTypes[mt][option] === value) {
        return true;
      }
    }

    return false;
  } // 360浏览器 这里可以封装成修正函数


  var is360 = false;

  if (window.chrome) {
    var _chromeVision = Number(UA.replace(/^.*chrome\/([\d]+).*$/, '$1'));

    if (_chromeVision > 36 && window.showModalDialog) {
      is360 = true;
    } else if (_chromeVision > 45) {
      is360 = mime('type', 'application/vnd.chromium.remoting-viewer');
    }
  }

  if (result.device !== 'Mobile' && is360) {
    if (mime('type', 'application/gameplugin')) {
      result.browser = '360安全浏览器';
    } else {
      result.browser = '360极速浏览器';
    }
  }

  if (result.browser === 'IE' || result.browser === 'Edge') {
    var screenTop = window.screenTop - window.screenY;

    switch (screenTop) {
      case 71: // 无收藏栏,贴边

      case 74: // 无收藏栏,非贴边

      case 99: // 有收藏栏,贴边

      case 102:
        // 有收藏栏,非贴边
        result.browser = '360极速浏览器';
        break;

      case 75: // 无收藏栏,贴边

      case 105: // 有收藏栏,贴边

      case 104:
        // 有收藏栏,非贴边
        result.browser = '360安全浏览器';
        break;
    }
  } // 系统版本信息


  var osVersion = {
    'Windows': function Windows() {
      var version = UA.replace(/^.*windows nt ([\d.]+);.*$/, '$1');
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
  }; // 操作系统版本

  result.osVersion = osVersion[result.os](); // chrome内核版本

  var chromeVision = function chromeVision(edition) {
    var chromeVision = UA.replace(/^.*chrome\/([\d]+).*$/, '$1');
    return edition[chromeVision] || '';
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
      var edition = {
        '21': '4.0',
        '29': '4.5',
        '34': '5.0',
        '39': '5.2',
        '42': '5.3',
        '46': '5.9',
        '49': '6.0',
        '57': '6.5'
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
  }; // 浏览器版本

  result.browserVersion = browserVersion[result.browser](); // 修正内核

  if (result.browser === 'Chrome' && parseInt(result.browserVersion) > 27 || result.browser === 'Opera' && parseInt(result.browserVersion) > 12 || result.browser === 'Yandex') {
    result.kernel = 'Blink';
  }

  window.Browser = result;
  var result$1 = result;

  return result$1;

}));
/** Thu May 30 2019 11:10:14 GMT+0800 (GMT+08:00) **/
