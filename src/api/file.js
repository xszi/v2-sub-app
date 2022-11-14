import { API } from '@/service/api'
import { fileURL } from './global_variable'
// 批量获取文件下载地址和文件名
export async function findSignFileInfo(data) {
  return await API.post(`${fileURL}/file/findSignFileInfo`, data)
}
// 获得上传地址
export async function getUploadPath(data) {
  return await API.post(`${fileURL}/file/getUploadPath`, data)
}
// 用户上传文件后，保存信息
export async function fileSave(data) {
  return await API.post(`${fileURL}/file/save`, data)
}
// 获取文件下载地址和文件名
export async function getSignFileInfo(id) {
  return await API.get(`${fileURL}/file/getSignFileInfo/${id}`, {})
}
// 获取文件下载地址
export async function getDownloadPath(fileId) {
  return await API.get(`${fileURL}/file/getDownloadPath/${fileId}`, {})
}
// wps 文件编辑接口
export async function getOfficeOpenUrl(data) {
  return await API.get(`${fileURL}/order/operation/getOfficeOpenUrl/${data.fileId}`)
}
// wps文件读取接口
export async function getOfficeReadUrl(data) {
  return await API.get(`${fileURL}/order/operation/getOfficeReadUrl/${data.fileId}`)
}
