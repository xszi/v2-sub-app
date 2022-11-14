import { API } from '@/service/api'
import { preRecordURL } from './global_variable'
// 获取角色集合
export function getOrderIdentities(orderId) {
  return API.get(`${preRecordURL}/file/fileRecordOrder/getOrderIdentities/${orderId}`)
}

// 获取主体明细
export function getOrderSubjectDetail(params) {
  return API.post(`${preRecordURL}/file/fileRecordOrderSubject/getOrderSubjectDetail`, params)
}

// 获取签章方式列表接口
export function getSignatureType() {
  return API.get(`${preRecordURL}/file/fileRecordOrder/getSignatureType`)
}

// 获取签署位接口
export function getSubjectSites(params) {
  return API.get(`${preRecordURL}/file/fileOrderAgreementSubjectSign/getSubjectSites/${params.orderId}/${params.subjectId}`)
}

// 获取视频方式列表接口
export function getVideoType() {
  return API.get(`${preRecordURL}/file/fileRecordOrder/getVideoType`)
}

// 保存签署方草稿
export function saveDraftSignSubject(params) {
  return API.post(`${preRecordURL}/file/fileRecordOrderSubject/draftSignSubject`, params)
}

// 保存签署方配置列表
export function saveSignSubjectList(params) {
  return API.post(`${preRecordURL}/file/fileRecordOrderSubject/saveSignSubject`, params)
}

// 删除录单签署方接口
export function deleteSignSubject(params) {
  return API.post(`${preRecordURL}/file/fileRecordOrderSubject/deleteSignSubject/${params.orderId}/${params.subjectId}`)
}

// 增加新的签署主体接口
export function addSubject(params) {
  return API.post(`${preRecordURL}/file/fileRecordOrderSubject/addSubject`, params)
}

// 增加新的签署主体接口
export function saveEditSubject(params) {
  return API.post(`${preRecordURL}/file/fileRecordOrderSubject/saveEditSubject`, params)
}

// 引用签署方接口
export function introduceSignSubject(params) {
  return API.post(`${preRecordURL}/file/fileRecordOrderSubject/introduceSignSubject`, params)
}

// 获取签署方列表接口
export function getSignSubjectList(params) {
  return API.post(`${preRecordURL}/file/fileRecordOrderSubject/getSignSubject/${params}`)
}

// 添加签署方步骤保存接口
export function saveSignSubject(params) {
  return API.post(`${preRecordURL}/file/fileRecordOrderSubject/saveSignSubject`, params)
}

// 获取个人签署方列表接口
export function findPersonSubject(params) {
  return API.post(`${preRecordURL}/file/fileRecordOrderSubject/person/findPage`, params)
}

// 获取本企业签署方列表
export function findCompanySubjectPage(params) {
  return API.post(`${preRecordURL}/file/fileRecordOrderSubject/findPage`, params)
}

// 获取企业主体类型列表
export function getEmpSubjectSubTypeList() {
  return API.get(`${preRecordURL}/file/fileRecordOrderSubject/getEmpSubjectSubTypeList`)
}
