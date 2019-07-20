const NAV = window.navigator

// 检测type
function mime(option, value) {
  const mimeTypes = NAV.mimeTypes
  for (const mt in mimeTypes) {
    if (mimeTypes[mt][option] === value) {
      return true
    }
  }
  return false
}

// mac 360极速
function is360ByUserActivationProperty() {
  if (NAV.userActivation) {
    return false // chrome
  } else {
    return true // 360极速
  }
}

export const UA = NAV.userAgent.toLowerCase()

// 修正360浏览器
export function revise360(item) {
  let is2345 = false
  let is360 = false
  if (item.os === 'Windows') {
    const chromeVision = Number(UA.replace(/^.*chrome\/([\d]+).*$/, '$1'))
    // 2345浏览器9.7版本会被误判为360极速
    if (window.chrome && window.chrome.adblock2345) {
      is2345 = true
    } else if (chromeVision > 36 && window.showModalDialog) {
      is360 = true
    } else if (chromeVision > 45) {
      is360 = mime('type', 'application/vnd.chromium.remoting-viewer')
    }
  } else if (item.os === 'Mac OS') {
    is360 = is360ByUserActivationProperty()
  }

  if (is2345) {
    item.browser = '2345浏览器'
  }

  if (is360) {
    if (mime('type', 'application/gameplugin')) {
      item.browser = '360安全浏览器'
    } else {
      item.browser = '360极速浏览器'
    }
  }
}

// 修正内核
export function reviseKernel(item) {
  if (
    (item.browser === 'Chrome' && parseInt(item.browserVersion) > 27) ||
    (item.browser === 'Opera' && parseInt(item.browserVersion) > 12) ||
    (item.browser === 'Yandex')
  ) {
    item.kernel = 'Blink'
  }
}

// 获取chrome内核版本
export function chromeVision(edition) {
  const chromeVision = UA.replace(/^.*chrome\/([\d]+).*$/, '$1')
  return edition[chromeVision] || ''
}
