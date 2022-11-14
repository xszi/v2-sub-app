/**
 * Created by Rita on 22/02/17.
 */

/**
  * 获取表单变化，要传的接口信息
  * 	              类型		组件类型 componentType 0 10  20 50 (30分页，40预览，这两个组件用不到)
				                      位置
        修改地址	    1		  20
        新增地址分组	6		  20
        新增地址事项	7		  20
        删除地址分组	10		20
        删除地址事项	11		20

        选择主体	    4		  10	主体的下拉框
        新增主体主键	5		  10	新增主体的分组
        删除主体主键	9		  10	删除主体的分组

        新增变量分组	8	  	10\50\0
        修改变量	    2		  10\50\0
        删除变量分组	12		10\50\0
 * @param {string} componentType
 * @param {string} optType
 * @returns {Number}
 */
export function filterOptType(componentType, optType) {
  const typeMap = {
    10: {
      'edit': 2,
      'addGroup': 8, // √
      'delGroup': 12,

      'selChange': 4,
      'addIdentity': 5,
      'delIdentity': 9
    },
    20: {
      'edit': 1, // √
      'addGroup': 6, // √
      'delGroup': 10, // √
      'addMatter': 7, // √
      'delMatter': 11 // √
    },
    50: {
      'edit': 2, // √
      'addGroup': 8,
      'delGroup': 12
    },
    0: {
      'edit': 2, // √
      'addGroup': 8,
      'delGroup': 12
    }
  }
  const aimType = typeMap[componentType] ? typeMap[componentType][optType] : false
  return aimType
}

/**
 * 生成uuiid
 * @param {Number} len 指定长度
 * @param {Number} radix 指定基数
 * @returns {String}
 */
export function generateUuid(len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  var uuid = []
  var i
  radix = radix || chars.length

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    // rfc4122, version 4 form
    var r

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}

/**
 * @param idCard 身份证号
 * 获取身份证的性别
 * [{ code: 0, name: '女' }, { code: 1, name: '男' }]
 */
export function getSex(idCard) {
  var sexStr = ''
  if (parseInt(idCard.slice(-2, -1)) % 2 === 1) {
    sexStr = '1'
  } else {
    sexStr = '0'
  }
  return sexStr
}

/**
 * @param idCard
 * 获取身份证的出生日期
 */
export function getBirth(idCard) {
  var birthday = ''
  var birthDate = ''
  if (idCard != null && idCard !== '') {
    if (idCard.length === 15) {
      birthday = '19' + idCard.slice(6, 12)
    } else if (idCard.length === 18) {
      birthday = idCard.slice(6, 14)
    }
    birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-')
    // 通过正则表达式来指定输出格式为:1990-01-01
    // 检验日期是否合法
    birthDate = checkDate(birthday) ? birthday : ''
  }
  return birthDate
}

// 判断从身份证里面读取的日期是否合法
function checkDate(inString) {
  return new Date(inString).getDate() === inString.substring(inString.length - 2)
}
