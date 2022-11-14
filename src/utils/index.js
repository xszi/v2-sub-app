
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
            1 +
            '月' +
            d.getDate() +
            '日' +
            d.getHours() +
            '时' +
            d.getMinutes() +
            '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

export function getCurrentTime() {
  const yy = new Date().getFullYear()
  const mm = new Date().getMonth() + 1
  const dd = new Date().getDate()
  const hh = new Date().getHours()
  const mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
  const ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
  return yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mf + ':' + ss
}

/**
 * 金额千分位处理 100000.76 处理成 100,000.76
 * @param {Number} num 金额
 * @param {Number} n  保留小数位 默认是2
 * @returns String
 */
export function priceFormat(num, n) {
  n = n || 2
  let symbol = ','
  if (num === null) return num
  if (typeof num !== 'number') throw new TypeError('num参数应该是一个number类型')
  if (n < 0) throw new Error('参数n不应该小于0')
  const hasDot = parseInt(num) !== num // 这里检测num是否为小数，true表示小数
  const m = (n !== undefined && n != null) ? n : 1
  num = m === 0 ? num.toFixed(m) + '.' : hasDot ? (n ? num.toFixed(n) : num) : num.toFixed(m)
  symbol = symbol || ','
  num = num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function(match, p1, p2) {
    return p1 + symbol
  })
  if (n === 0 || (!hasDot && !n)) { // 如果n为0或者传入的num是整数并且没有指定整数的保留位数，则去掉前面操作中的小数位
    num = num.substring(0, num.indexOf('.'))
  }
  return num
}

// 去除千分位中的‘，’  金额千分位处理 100，000.76 处理成 100000.76
export function delcommafy(num) {
  if (!num) return num
  num = num.toString()
  num = num.replace(/,/gi, '')
  if (num.indexOf('.00') > 0) num = parseInt(num)
  return num
}

/** 获取列表中 表格的动态高度
 * 1，@param upHeight : 搜索高度
 * 2，@param page :分页组件高度
 * 3，可视区域高度
 */
export function getTableHeight(upHeight = 320, page = 100) {
  // 可用窗口的高度
  const clientHeight = document.documentElement.clientHeight
  const tableHeight = Number(clientHeight - (upHeight + page))
  return tableHeight + 'px'
}

export function transFileType(fileName) {
  let tmpFileType = ''
  if (fileName) {
    const splitLen = fileName.split('.').length
    const fileType = splitLen > 1 ? fileName.split('.')[splitLen - 1] : ''
    tmpFileType = '.' + fileType.toLowerCase()
  }
  return tmpFileType
}

// 通过身份证获取出生日期
export function getBirthdayByCard(card) {
  if (!card) return ''
  try {
    const length = card.length
    if (length === 15) {
      return `19${card.substr(6, 2)}-${card.substr(8, 2)}-${card.substr(10, 2)}`
    }
    if (length === 18) {
      return `${card.substr(6, 4)}-${card.substr(10, 2)}-${card.substr(12, 2)}`
    }
    return ''
  } catch (e) {
    return ''
  }
}

export function getGenderByCard(card) {
  if (!card) return ''
  try {
    const length = card.length
    if (length === 15) {
      const num = card.substr(13, 1)
      return parseInt(num) % 2 === 0 ? '0' : '1'
    }
    if (length === 18) {
      const num = card.substr(16, 1)
      return parseInt(num) % 2 === 0 ? '0' : '1'
    }
    return ''
  } catch (e) {
    return ''
  }
}

export function getFileType(ext) {
  if (!ext) return 'other'
  ext = ext.toLocaleLowerCase()
  if (['jpg', 'jpeg', 'png', 'bmp', 'gif'].includes(ext)) return 'image'
  if (['doc', 'docx'].includes(ext)) return 'word'
  if (['ppt', 'pptx'].includes(ext)) return 'ppt'
  if (['txt'].includes(ext)) return 'txt'
  if (['zip', 'rar', '7z'].includes(ext)) return 'zip'
  if (['mp3'].includes(ext)) return 'audio'
  if (['mp4', 'avi', 'mov'].includes(ext)) return 'video'
  if (['pdf'].includes(ext)) return 'pdf'

  return 'other'
}
export const fileTypeIcons = {
  image: require('@/assets/images/ext/picture.png'),
  word: require('@/assets/images/ext/word.png'),
  ppt: require('@/assets/images/ext/ppt.png'),
  zip: require('@/assets/images/ext/ZIP.png'),
  audio: require('@/assets/images/ext/audio.png'),
  video: require('@/assets/images/ext/video.png'),
  txt: require('@/assets/images/ext/txt.png'),
  other: require('@/assets/images/ext/other.png'),
  pdf: require('@/assets/images/ext/pdf.png')
}

// 个人主体的varcode对应主体信息的key
export const personalCodeKey = {
  'INDIVIDUAL_SUBJECT_TYPE': 'subjectSubType', // 个人主体类型
  'FULL_NAME': 'subjectName', // 姓名
  'DOCUMENT_TYPE': 'subjectCertType', // 证件类型
  'IDENTIFICATION_NUMBER': 'subjectCertNo', // 证件号码
  'GENDER': 'gender', // 性别
  'DATE_OF_BIRTH': 'birthday', // 出生日期
  'RESIDENCE': 'address', // 住所
  'MARITAL_STATUS': 'maritalStatus', // 婚姻状况
  'PHONE_NUMBER': 'phone', // 手机号
  'ID_MATERIAL': 'subjectMaterials' // 身份材料
}
// 机构主体的varcode对应主体信息的key
export const enterpriseCodeKey = {
  'ENTERPRISE_SUBJECT_TYPE': 'subjectSubType', // 企业主体类型
  'NAME': 'subjectName', // 名称
  'ORGANIZATION_CERTIFICATE_TYPE': 'subjectCertType', // 机构证件类型
  'ORGANIZATION_CERTIFICATE_NUMBER': 'subjectCertNo', // 机构证件号码
  'LEGAL_REPRESENTATIVE': 'responsibleName', // 法定代表人
  'INSTITUTION_DOMICILE': 'address', // 机构住所
  'CONTACT_MOBILE_NUMBER': 'phone', // 联系人手机号码
  'ORG_MATERIAL': 'subjectMaterials' // 机构材料 meterialType 20
}
// 法定代表人
export const responsibleCodeKey = {
  'PHONE_OF_LEGAL_REPRESENTATIVE': 'phone', // 法定代表人手机号
  'CERTIFICATE_TYPE_OF_LEGAL_REPRESENTATIVE': 'responsibleCertType', // 法定代表人证件类型 responsibleType
  'CERTIFICATE_NUMBER_OF_LEGAL_REPRESENTATIVE': 'responsibleCertNo', // 法定代表人证件号码
  'RESPONSIBLE_ID_MATERIAL': 'subjectMaterials', // 身份材料 meterialType 10
  'GENDER_OF_LEGAL_REPRESENTATIVE': 'gender', // 法定代表人性别
  'DATE_OF_BIRTH_OF_LEGAL_REPRESENTATIVE': 'birthday' // 法定代表人出生日期
}
// 委托代理人varCode对应主体信息的key
export const agentCodeKey = {
  AGENTNAME: 'agentName', // 姓名
  CERTIFICATE_TYPE_OF_AGENT: 'agentCertType', // 证件类型
  CERTIFICATE_NUMBER_OF_AGENT: 'agentCertNo', // 证件号
  GENDER_OF_LEGAL_AGENT: 'agentGender', // 性别
  DATE_OF_BIRTH_OF_AGENT: 'agentBirthday', // 出生日期
  AGENT_ID_MATERIAL: 'agentMaterials', // 证件材料
  PHONE_OF_AGENT: 'agentPhone' // 手机号
}
// 出生日期、性别 对应的varCode
export const birthdayGenderCodes = ['DATE_OF_BIRTH', 'GENDER', 'DATE_OF_BIRTH_OF_LEGAL_REPRESENTATIVE', 'GENDER_OF_LEGAL_REPRESENTATIVE', 'DATE_OF_BIRTH_OF_AGENT', 'GENDER_OF_LEGAL_AGENT']
export const cardCodes = ['IDENTIFICATION_NUMBER', 'CERTIFICATE_NUMBER_OF_LEGAL_REPRESENTATIVE', 'CERTIFICATE_NUMBER_OF_AGENT']

