import { API } from '@/service/api'
import { fileURL, orderURL } from './global_variable'
// /获取上传地址
export function getUploadPath(params) {
  return API.post(`${fileURL}/file/getUploadPath`, params)
}

// /保存obs信息
export function fileSave(params) {
  return API.post(`${fileURL}/file/save`, params)
}

// /获取下载地址
export function getDownloadPath(fileId) {
  return API.get(`${fileURL}/file/getDownloadPath/${fileId}`)
}

// /批量获取文件下载地址
export function batchGetDownloadPath(params) {
  return API.post(`${fileURL}/file/findSignFileInfo`, params)
}

// 获取文件下载地址和文件名
export function getObsFileUrl(fileId) {
  return API.get(`${fileURL}/file/getSignFileInfo/${fileId}`)
}

// wps文件读取接口
export function getOfficeReadUrl(data) {
  return API.get(`${orderURL}/order/operation/getOfficeReadUrl/${data.fileId}`)
}
export function batchRemoveFile(token, data) {
  return API.post(`${fileURL}/rest/qrCode/batchRemove/${token}`, data)
}

export function getSignFileInfoByToken(token) {
  return API.get(`${fileURL}/rest/qrCode/getSignFileInfo/${token}`)
}
export function getOrCodeUrl() {
  return API.get(`${fileURL}/file/getOrCodeUrl`)
}
export default {
  getUploadPath,
  batchGetDownloadPath,
  getDownloadPath,
  fileSave,
  getObsFileUrl,
  getOfficeReadUrl,
  batchRemoveFile,
  getSignFileInfoByToken,
  getOrCodeUrl
}
