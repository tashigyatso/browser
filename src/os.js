import { UA } from './utils.js'

export const OSSys = [
  'Windows',
  'Linux',
  'Android',
  'Windows Phone',
  'Ubuntu',
  'FreeBSD',
  'Debian',
  'BlackBerry',
  'MeeGo',
  'Symbian'
]

// 修正配置
export const OSSysRevise = {
  'x11': 'Linux',
  'macintosh': 'Mac OS',
  'adr': 'Android',
  'like mac os x': 'iOS',
  'iemobile': 'Windows Phone',
  'rim': 'BlackBerry',
  'cros': 'Chrome OS',
  'hpwos': 'WebOS'
}

// 系统版本信息
export const OsVersion = {
  'Windows'() {
    const version = parseFloat(UA.replace(/^.*windows nt ([\d.]+).*$/, '$1'))
    const edition = {
      '5.0': '2000',
      '5.1': 'XP',
      '5.2': 'XP',
      '6.0': 'Vista',
      '6.1': '7',
      '6.2': '8',
      '6.3': '8.1',
      '6.4': '10'
    }
    return edition[version] || version
  },
  'Mac OS'() {
    return UA.replace(/^.*mac os x ([\d_]+).*$/, '$1').replace(/_/g, '.')
  },
  'Android'() {
    return UA.replace(/^.*android ([\d.]+);.*$/, '$1')
  },
  'iOS'() {
    return UA.replace(/^.*os ([\d_]+) like.*$/, '$1').replace(/_/g, '.')
  },
  'Windows Phone'() {
    return UA.replace(/^.*windows phone( os)? ([\d.]+);.*$/, '$2')
  },
  'WebOS'() {
    return UA.replace(/^.*hpwos\/([\d.]+);.*$/, '$1')
  },
  'Debian'() {
    return UA.replace(/^.*debian\/([\d.]+).*$/, '$1')
  }
}
