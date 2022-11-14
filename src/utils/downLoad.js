/**
 * 解析blob响应内容并下载
 * @param {*} url文件地址
 * @param {String} fileName 文件名称
 */
export function createALink(url) {
  const link = document.createElement('a')
  // link.href = window.URL.createObjectURL(blob)
  // link.download = fileName // 设置文件名
  link.href = url
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link) // 下载完成移除元素
  // window.URL.revokeObjectURL(link.href) // 释放掉blob对象
}
