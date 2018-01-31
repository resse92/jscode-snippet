/**
 * 将小程序的API封装成支持Promise的API
 * @params fn {Function} 小程序原始API，如wx.login
 */
export function wxPromisify (fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }
      obj.fail = function (res) {
        reject(res)
      }
      fn(obj)
    })
  }
}
/**
 * 随机颜色
 */
export function ramdomColor () {
  return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6)
}

/**
 * 格式化表单数据
 * @param {*string} search 字符串(?dsk=dks&ds=dsk)
 */
/* eslint-disable no-sequences */
export const query = (search = '') => ((querystring = '') =>
(q => (querystring.split('&').forEach(item =>
  (kv => kv[0] && (q[kv[0]] = kv[1]))(item.split('='))), q))({}))(search.split('?')[1])
/* eslint-enable */

/**
 * 获取url参数
 * @param {*string} key 参数名
 */
export function getQueryString (key) {
  let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}

/**
 * 多维数组变一维数组
 * @param {*array} ary 多维数组
 */
export const flatten = (ary) => ary.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [])

// Date.prototype.format = function (fmt) { 
//   var o = {
//     'M+': this.getMonth() + 1, // 月份
//     'd+': this.getDate(), // 日
//     'h+': this.getHours(), // 小时
//     'm+': this.getMinutes(), // 分
//     's+': this.getSeconds(), // 秒
//     'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
//     'S': this.getMilliseconds() // 毫秒
//   }
//   if (/(y+)/.test(fmt)) {
//     fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
//   }
//   for (var k in o) {
//     if (new RegExp('(' + k + ')').test(fmt)) {
//       fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
//     }
//   }
//   return fmt
// }

/**
 * 格式化日期输出
 * @param {*Date} date 日期
 * @param {*String} format 日期格式
 */
export function formatDate(date, format) {
  let z = {
    y: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  }
  return format.replace(/(y+|M+|d+|h+|m+|s+)/g, function(v) {
    let v1 = v.slice(-1)
    return ((v.length > 1 ? '0' : '') + z[v1]).slice(-(v.length > 2 ? v.length : 2))
  })
}
/**
 * 统计文字个数
 * @param {*String} data 字符串
 */
export function wordCount(data) {
  var pattern = /[a-zA-Z0-9_\u0392-\u03c9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g
  var m = data.match(pattern)
  var count = 0
  if (m === null) return count
  for (var i = 0; i < m.length; i++) {
    if (m[i].charCodeAt(0) >= 0x4E00) {
      count += m[i].length
    } else {
      count += 1
    }
  }
  return count
}

/**
 * 特殊字符转义 '&jfkds<>' -> '&ampjfkds&lt;&gt;'
 * @param {*String} str 需要转义的字符
 */
export function htmlspecialchars (str) {
  let htmlstr = str.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&quot;')
  return htmlstr
}

/**
 * 动态插入js代码
 * @param {*any} src js代码
 */
export function injectScript(src) {
  var s, t
  s = document.createElement('script')
  s.type = 'text/javascript'
  s.async = true
  s.src = src
  t = document.getElementsByTagName('script')[0]
  t.parentNode.insertBefore(s, t)
}

/**
 * 格式化数字 例2313123 -> '2,313,323'
 * @param {*string} str 需要格式化的数字字符串
 */
export function formatNum(str) {
  return str.split('').reverse().reduce((prev, next, index) => {
    return ((index % 3) ? next : (next + ',')) + prev
  })
}
/**
 * 验证身份证号
 * @param {*string} sNo 身份证号
 */
export function chechCHNCardId(sNo) {
  if (!this.regExpTest(sNo, /^[0-9]{17}[X0-9]$/)) {
    return false
  }
  sNo = sNo.toString()

  var a, b, c
  a = parseInt(sNo.substr(0, 1)) * 7 + parseInt(sNo.substr(1, 1)) * 9 + parseInt(sNo.substr(2, 1)) * 10
  a = a + parseInt(sNo.substr(3, 1)) * 5 + parseInt(sNo.substr(4, 1)) * 8 + parseInt(sNo.substr(5, 1)) * 4
  a = a + parseInt(sNo.substr(6, 1)) * 2 + parseInt(sNo.substr(7, 1)) * 1 + parseInt(sNo.substr(8, 1)) * 6
  a = a + parseInt(sNo.substr(9, 1)) * 3 + parseInt(sNo.substr(10, 1)) * 7 + parseInt(sNo.substr(11, 1)) * 9
  a = a + parseInt(sNo.substr(12, 1)) * 10 + parseInt(sNo.substr(13, 1)) * 5 + parseInt(sNo.substr(14, 1)) * 8
  a = a + parseInt(sNo.substr(15, 1)) * 4 + parseInt(sNo.substr(16, 1)) * 2
  b = a % 11

  if (b === 2) {
    c = sNo.substr(17, 1).toUpperCase()
  } else {
    c = parseInt(sNo.substr(17, 1))
  }

  switch (b) {
    case 0:
      if (c !== 1) {
        return false
      }
      break
    case 1:
      if (c !== 0) {
        return false
      }
      break
    case 2:
      if (c !== 'X') {
        return false
      }
      break
    case 3:
      if (c !== 9) {
        return false
      }
      break
    case 4:
      if (c !== 8) {
        return false
      }
      break
    case 5:
      if (c !== 7) {
        return false
      }
      break
    case 6:
      if (c !== 6) {
        return false
      }
      break
    case 7:
      if (c !== 5) {
        return false
      }
      break
    case 8:
      if (c !== 4) {
        return false
      }
      break
    case 9:
      if (c !== 3) {
        return false
      }
      break
    case 10:
      if (c !== 2) {
        return false
      }
  }
  return true
}

/**
 * 判断是否是对象
 * @param {*any} value 对象
 */
export function isObject(value) {
  return Object.prototype.toString.call(value).slice(8, -1) === 'Object'
}
/**
 * 判断是否是数组
 * @param {*any} value 数组
 */
export function isArray(value) {
  return Object.prototype.toString.call(value).slice(8, -1) === 'Array'
}
/**
 * 判断是否是函数
 * @param {*any} value 函数
 */
export function isFunction(value) {
  return Object.prototype.toString.call(value).slice(8, -1) === 'Function'
}
/**
 * 判断浮点数是否相等
 * @param {*float} n1 数1
 * @param {*float} n2 数2
 * @param {*int} epsilon 精度
 */
export function isEqual(n1, n2, epsilon) {
  epsilon = epsilon === undefined ? 10 : epsilon // 默认精度为10
  return n1.toFixed(epsilon) === n2.toFixed(epsilon)
}

/**
 * 格式化成表单数据
 * @param {*object} obj json对象
 */
export function formatParam(obj) {
  /* eslint-disable one-var */
  let query = '', name, value, fullSubName, subName, subValue, innerObj, i
  for (name in obj) {
    value = obj[name]

    if (value instanceof Array) {
      for (i = 0; i < value.length; ++i) {
        subValue = value[i]
        fullSubName = name + '[' + i + ']'
        innerObj = {}
        innerObj[fullSubName] = subValue
        query += formatParam(innerObj) + '&'
      }
    } else if (value instanceof Object) {
      for (subName in value) {
        subValue = value[subName]
        fullSubName = name + '[' + subName + ']'
        innerObj = {}
        innerObj[fullSubName] = subValue
        query += formatParam(innerObj) + '&'
      }
    } else if (value !== undefined && value !== null) {
      query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&'
    }
  }
  return query.length ? query.substr(0, query.length - 1) : query
}

/**
 * 快速生成uuid
 */
function uuid() {
  var d = new Date().getTime()
  var uuid = 'xxxxxxxxxxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

// /**
//  * 测试质数
//  * @param {*int} n 数字
//  */
// function isPrime(n) {
//   return !(/^.?$|^(..+?)\1+$/).test('1'.repeat(n))
// }