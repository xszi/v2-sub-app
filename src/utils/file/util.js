import changeDpi from './changeDpi'

/**
 * 将base64转换为blob
 * @param {*} base64Data
 * @param {*} type 文件类型
 * @returns
 */
export function base64ToBlob(base64Data, type) {
  const bytes = window.atob(base64Data.split(',')[1])
  const array = []
  for (let i = 0; i < bytes.length; i++) {
    array.push(bytes.charCodeAt(i))
  }
  return new Blob([new Uint8Array(array)], { type: type })
}

/**
 * 将Blob转换为file
 * @param {*} theBlob blob文件流
 * @param {*} fileName 文件名
 * @param {*} type 文件类型
 * @returns
 */
export function blobToFile(theBlob, fileName, type) {
  theBlob.lastModifiedDate = new Date()
  return new File([theBlob], fileName, { type: type })
}

/**
 * base64转file
 * @param {*} base64Data
 * @param {*} fileName
 * @param {*} type 文件类型
 * @returns
 */
export function base64ToFile(base64Data, fileName, type) {
  const bytes = window.atob(base64Data.split(',')[1])
  const array = []
  for (let i = 0; i < bytes.length; i++) {
    array.push(bytes.charCodeAt(i))
  }
  const theBlob = new Blob([new Uint8Array(array)], { type: type })
  theBlob.lastModifiedDate = new Date()
  return new File([theBlob], fileName, { type: type })
}

/**
 * base64文件下载
 * @param {*} base64Data
 * @param {*} fileName
 * @param {*} type
 */
export async function base64DownloadFile(base64Data, fileName, type) {
  const blob = base64ToBlob(base64Data, type)
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = fileName

  document.body.appendChild(link)
  const evt = document.createEvent('MouseEvents')
  evt.initEvent('click', false, false)
  link.dispatchEvent(evt)
  document.body.removeChild(link)
}

/**
 * 图片旋转
 * @param {*} imgUrl  base64文件
 * @param {*} angle 旋转角度
 * @returns
 */
export async function imageRotate(imgUrl, angle) {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      // 允许图片地址跨域
      img.crossOrigin = 'anonymous'
      img.src = imgUrl
      img.onload = function() {
        // 设置canvas宽高等于图片宽高
        canvas.width = this.width
        canvas.height = this.height
        // 画布中心点(也是起始点)平移至中心(0,0)->(x,y)
        ctx.translate(canvas.width / 2, canvas.height / 2)
        // 画布旋转
        ctx.rotate(angle * Math.PI / 180)
        // 绘制图像 图像起始点需偏移负宽高，图片起始点
        ctx.drawImage(img, -this.width / 2, -this.height / 2)
        // 返回结果(base64)
        const base64 = canvas.toDataURL('image/png')
        // 默认canvas是96dpi，改为72dpi
        const url = changeDpi.changeDpiDataUrl(base64, 72)
        resolve(url)
      }
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 图片设置透明度
 * @param {*} imgUrl base64文件
 * @param {*} transparency 透明度 0-1
 * @returns
 */
export async function setAlpha(imgUrl, transparency) {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      // 允许图片地址跨域
      img.crossOrigin = 'anonymous'
      img.src = imgUrl
      img.onload = function() {
      // 设置canvas宽高，等于图片宽高
        canvas.width = this.width
        canvas.height = this.height
        // 设置透明度
        ctx.globalAlpha = transparency
        ctx.drawImage(img, 0, 0, this.width, this.height)
        const base64 = canvas.toDataURL('image/png')
        // 默认canvas是96dpi，改为72dpi
        const url = changeDpi.changeDpiDataUrl(base64, 72)
        resolve(url)
      }
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 图片设置透明度，图片旋转
 * @param {*} imgUrl base64文件
 * @param {*} transparency 透明度 0-1
 * @returns
 */
export async function setRotateAndSetAlpha(imgUrl, angle, transparency) {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      // 允许图片地址跨域
      img.crossOrigin = 'anonymous'
      img.src = imgUrl
      img.onload = function() {
        // 设置canvas宽高等于图片宽高
        canvas.width = this.width
        canvas.height = this.height
        // 设置透明度
        ctx.globalAlpha = transparency
        // 画布中心点(也是起始点)平移至中心(0,0)->(x,y)
        ctx.translate(canvas.width / 2, canvas.height / 2)
        // 画布旋转
        ctx.rotate(angle * Math.PI / 180)
        // 绘制图像 图像起始点需偏移负宽高，图片起始点
        ctx.drawImage(img, -this.width / 2, -this.height / 2)
        // 返回结果(base64)
        const base64 = canvas.toDataURL('image/png')
        // 默认canvas是96dpi，改为72dpi
        const url = changeDpi.changeDpiDataUrl(base64, 72)
        resolve(url)
      }
    } catch (error) {
      reject(error)
    }
  })
}
