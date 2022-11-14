/**
 * 封装自定义 dayjs 日期处理模块
 */
import dayjs from 'dayjs'

// 日期格式化
export const formatTime = (value, format = 'YYYY-MM-DD hh:mm:ss') => {
  if (!value) return value
  return dayjs(value).format(format)
}

export default {
  install(Vue) {
    Vue.filter('formatTime', formatTime)
  }
}
