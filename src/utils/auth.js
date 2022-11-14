import { getBrowserCache, setBrowserCache, removeBrowserCache } from '@/utils/browserCache'

export const getStorage = (name) => {
  // 未经处理的请求数据
  const data = getBrowserCache(name)
  try {
    // 将data转为js对象
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}
// 存储
export const setStorage = (name, value) => {
  // 如果value是对象，把value转为json字符串存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  setBrowserCache(name, value)
}
// 删除
export const removeStorage = name => {
  removeBrowserCache(name)
}
