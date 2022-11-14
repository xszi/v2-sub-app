import $fileApi from '@/api/huaweiObs'
import { calculateMd5 } from '@/utils/fileObs'
import $axios from 'axios'

import { Message } from 'element-ui'

/**
 *
 * @param {*} file 文件流
 * @param {*} acceptList 允许上传类型
 * @param {*} size 文件大小
 * @returns
 */
export function beforeUpload(file, acceptList, size) {
  if (acceptList) {
    const pointIndex = file.name.lastIndexOf('.')
    const ext = pointIndex > -1 ? file.name.slice(pointIndex + 1) : ''
    if (!acceptList.includes(ext.toLocaleLowerCase())) {
      setTimeout(() => {
        Message.error(`请上传${acceptList.join(',')}格式`)// 图片
      }, 10)
      return false
    }
  }
  if (file.size > 20 * 1024 * 1000) {
    setTimeout(() => {
      this.$message.warning('最多支持上传20个文件，可多选，每份最大20MB')
    }, 10)
    return false
  }
  if (size) {
    const isSize = file.size / 1024 / 1024 < size
    if (!isSize) {
      setTimeout(() => {
        Message.error(`请上传${size}M以内文件`)
      }, 10)
      return false
    }
  }
  if (file.name.length > 50) {
    setTimeout(() => {
      setTimeout(() => {
        Message.warning('上传的文件名长度最多50个字符')
      })
    }, 10)
    return false
  }
  return true
}

/**
 * 文件上传到华为OBS
 * @param file 必填 file类型 文件流
 * @returns
 */
export async function fileUpload(file) {
  try {
    const md5 = await calculateMd5(file)
    const params = { modelName: 'file', fileName: file.name, contentMD5: md5 }
    const res = await $fileApi.getUploadPath(params)
    if (res.code !== 0) {
      return
    }
    const { path, objectKey, contentType, contentMD5 } = res.data
    const headersConfig = contentMD5 ? { 'Content-Type': contentType, 'Content-MD5': contentMD5 } : { 'Content-Type': contentType }
    await $axios({
      method: 'PUT',
      url: path,
      data: new Blob([file]),
      headers: headersConfig
    })
    const saveRes = await $fileApi.fileSave({ objectKey, fileName: file.name })
    if (saveRes.code !== 0) {
      return
    }
    const data = file
    data.fileId = saveRes.data
    return data
  } catch (e) {
    console.error(e)
  }
}
