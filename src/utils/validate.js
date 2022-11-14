/**
 * Created by PanJiaChen on 16/11/18.
 */
import a from '@/utils/'

/**
 * @param {string} path
 * @returns {Boolean}
 */

import { cardCodes } from "@/utils"
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} cardNo
 * @returns {Boolean}
 */
export function validateCardNo(cardNo) {
  // const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  var reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
  if (reg.test(cardNo)) {
    return true
  } else {
    return false
  }
}

/**
 * @param {string} cardNo
 * @returns {Boolean}
 */
 export function validateIdCardNo(cardNo) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (reg.test(cardNo)) {
    return true
  } else {
    return false
  }
}

// 手机号码验证
export function validateTel(str) {
  const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  return reg.test(str)
}

/**
 * 邮箱校验
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

// 身份证验证
const vcity = {
  11: '北京',
  12: '天津',
  13: '河北',
  14: '山西',
  15: '内蒙古',
  21: '辽宁',
  22: '吉林',
  23: '黑龙江',
  31: '上海',
  32: '江苏',
  33: '浙江',
  34: '安徽',
  35: '福建',
  36: '江西',
  37: '山东',
  41: '河南',
  42: '湖北',
  43: '湖南',
  44: '广东',
  45: '广西',
  46: '海南',
  50: '重庆',
  51: '四川',
  52: '贵州',
  53: '云南',
  54: '西藏',
  61: '陕西',
  62: '甘肃',
  63: '青海',
  64: '宁夏',
  65: '新疆',
  71: '台湾',
  81: '香港',
  82: '澳门',
  91: '国外'
}
// 检查号码是否符合规范，包括长度，类型
const isCardNo = card => {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/
  if (reg.test(card) === false) {
    return false
  }

  return true
}
// 取身份证前两位,校验省份
const checkProvince = card => {
  var province = card.substr(0, 2)
  if (vcity[province] == undefined) {
    return false
  }
  return true
}
// 检查生日是否正确
const checkBirthday = card => {
  var len = card.length
  // 身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
  if (len == '15') {
    var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/
    var arr_data = card.match(re_fifteen)
    var year = arr_data[2]
    var month = arr_data[3]
    var day = arr_data[4]
    var birthday = new Date('19' + year + '/' + month + '/' + day)
    return verifyBirthday('19' + year, month, day, birthday)
  }
  // 身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
  if (len == '18') {
    var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/
    const arr_data = card.match(re_eighteen)
    const year = arr_data[2]
    const month = arr_data[3]
    const day = arr_data[4]
    const birthday = new Date(year + '/' + month + '/' + day)
    return verifyBirthday(year, month, day, birthday)
  }
  return false
}
// 校验日期
const verifyBirthday = (year, month, day, birthday) => {
  var now = new Date()
  var now_year = now.getFullYear()
  // 年月日是否合理
  if (
    birthday.getFullYear() == year &&
    birthday.getMonth() + 1 == month &&
    birthday.getDate() == day
  ) {
    // 判断年份的范围（3岁到100岁之间)
    var time = now_year - year
    if (time >= 3 && time <= 100) {
      return true
    }
    return false
  }
  return false
}
// 校验位的检测
const checkParity = card => {
  // 15位转18位
  card = changeFivteenToEighteen(card)
  var len = card.length
  if (len == '18') {
    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2)
    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2')
    var cardTemp = 0
    var i
    var valnum
    for (i = 0; i < 17; i++) {
      cardTemp += card.substr(i, 1) * arrInt[i]
    }
    valnum = arrCh[cardTemp % 11]
    if (valnum == card.substr(17, 1)) {
      return true
    }
    return false
  }
  return false
}
// 15位转18位身份证号
const changeFivteenToEighteen = card => {
  if (card.length == '15') {
    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2)
    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2')
    var cardTemp = 0
    var i
    card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6)
    for (i = 0; i < 17; i++) {
      cardTemp += card.substr(i, 1) * arrInt[i]
    }
    card += arrCh[cardTemp % 11]
    return card
  }
  return card
}
export const checkCard = card => {
  // 校验长度，类型
  if (isCardNo(card) === false) {
    return false
  }
  // 检查省份
  if (checkProvince(card) === false) {
    return false
  }
  // 校验生日
  if (checkBirthday(card) === false) {
    return false
  }
  // 检验位的检测
  if (checkParity(card) === false) {
    return false
  }
  return true
}
export const checkPhone = phone => {
  const reg = /^1(([345678]\d{9})|([9][123567890])\d{8})$/
  return reg.test(phone)
}
export const checkEmail = email => {
  const reg = /^\w[-\w.+]*@([A-Za-z0-9][-_A-Za-z0-9]*\.)+[A-Za-z]{2,20}$/
  return reg.test(email)
}
// 港澳
export const checkHKCard = (card) => {
  const reg = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/
  return reg.test(card)
}
// 台湾
export const checkTWCard = (card) => {
  const reg = /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/
  return reg.test(card)
}
// 护照
export const checkPassPortCard = (card) => {
  const reg = /^([a-zA-z]|[0-9]){5,17}$/
  return reg.test(card)
}

// 自定义form变量校验
export function validateVar(rule, value = {}, callback) {
  try {
    // value.required = 1
    const { varName, varCode, formType, required, varValueJson } = value
    if (!required && (!varValueJson.value || varValueJson.value === 0 || !varValueJson.value.length || !varValueJson.start)) {
      return callback()
    }
    if ([1, 2, 3, 10].includes(formType)) {
      if (!varValueJson.value && varValueJson.value !== 0) return callback(new Error(`请输入${varName}`))
    }
    if ([4, 5, 6, 9].includes(formType)) {
      if (!varValueJson.value) return callback(new Error(`请选择${varName}`))
    }
    if ([7, 12].includes(formType)) {
      if (!varValueJson.value || !varValueJson.value.length) return callback(new Error(`请选择${varName}`))
    }
    if ([8, 13].includes(formType)) {
      if (!varValueJson.value || !varValueJson.value.length) return callback(new Error(`请上传${varName}`))
    }
    if ([11].includes(formType)) {
      if (varValueJson.forever) return callback()
      if (!varValueJson.start) return callback(new Error(`请选择${varName}`))
    }
    // 手机号格式校验
    if (['CONTACT_MOBILE_NUMBER', 'PHONE_NUMBER'].includes(varCode)) {
      if (!checkPhone(varValueJson.value)) return callback(new Error(`${varName}格式不正确`))
    }
    if (cardCodes.includes(varCode)) {
      if (rule.personalCardType === '111') {
        if (!checkCard(varValue.value)) {
          return callback(new Error(`${varName}格式不正确`))
        }
      }
    }
    callback()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
  }
}

