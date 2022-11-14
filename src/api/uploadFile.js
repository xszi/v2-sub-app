import { API } from '@/service/api'
import { preRecordURL } from './global_variable'

// 创建文件
export function createFileRecordOrder() {
  return API.post(`${preRecordURL}/file/fileRecordOrder/create`, {})
}

// 查询文件详情
export function getFileRecordOrderInfo(orderId) {
  return API.get(`${preRecordURL}/file/fileRecordOrder/step1/${orderId}`)
}

// 业务归属
export function findAscription(params) {
  return API.post(`${preRecordURL}/pre/preRecordOrder/findAscription`, params)
}

// 获取公证事项列表
export function getMatterList(orderId) {
  return API.get(`${preRecordURL}/file/fileRecordOrder/getOrderMatterList/${orderId}`)
}

// 获取承办人
export function getUnderTaker(params) {
  return API.post(`${preRecordURL}/file/fileRecordOrder/getUnderTaker`, params)
}

// 获取承办人
export function getNotaryUser(params) {
  return API.post(`${preRecordURL}/file/fileRecordOrder/getNotaryUser`, params)
}

// 上传签署文件
export function saveAgreement(params) {
  return API.post(`${preRecordURL}/file/fileRecordOrder/saveAgreements`, params, 300000)
}

// 删除签署文件
export function deleteSignFile(orderId, id) {
  return API.post(`${preRecordURL}/file/fileRecordOrder/deleteSignFile/${orderId}/${id}`)
}

// 上传证据文件
export function saveEvidence(params) {
  return API.post(`${preRecordURL}/file/fileRecordOrder/saveEvidences`, params)
}

// 删除证据文件
export function deleteEvidence(orderId, id) {
  return API.post(`${preRecordURL}/file/fileRecordOrder/deleteEvidence//${orderId}/${id}`)
}

// 获取签署文件类型
export function getSignFileType() {
  return API.get(`${preRecordURL}/file/fileRecordOrder/getSignFileType`)
}

// 获取证据材料文件类型
export function getEvidenceFileType() {
  return API.get(`${preRecordURL}/file/fileRecordOrder/getEvidenceFileType`)
}

// 保存录单
export function saveFileRecordOrder(params) {
  return API.post(`${preRecordURL}/file/fileRecordOrder/step1/save`, params)
}

// 保存草稿
export function saveFileRecordOrderDraft(params) {
  return API.post(`${preRecordURL}/file/fileRecordOrder/step1/draft`, params)
}
