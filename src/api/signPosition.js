import { API } from '@/service/api'
import { preRecordURL } from './global_variable'

// /获取文件列表
export function getFileList(orderId) {
  return API.get(`${preRecordURL}/file/fileRecordOrderAgreement/agreementList/${orderId}`)
}
// 签署文件删除
export function deleteSignFile(orderId, id) {
  return API.post(`${preRecordURL}/file/fileRecordOrder/deleteSignFile/${orderId}/${id}`)
}
// 获取pdf关键字定位
export function getKeywordPosition(params) {
  return API.post(`${preRecordURL}/file/fileOrderAgreementSubjectSign/keyword`, params)
}
// /保存签章签署位
export function saveSiteInfo(params) {
  return API.post(`${preRecordURL}/file/fileOrderAgreementSubjectSign/saveSiteInfo`, params)
}
// /获取签章签署位-全部
export function querySiteInfos(orderId, id) {
  return API.get(`${preRecordURL}/file/fileOrderAgreementSubjectSign/querySiteInfo/${orderId}`)
}
// /获取签章签署位-单份文件
export function querySiteInfo(orderId, id) {
  return API.get(`${preRecordURL}/file/fileOrderAgreementSubjectSign/querySiteInfo/${orderId}/${id}`)
}
// /保存草稿
export function draftSiteInfo(params) {
  return API.post(`${preRecordURL}/file/fileOrderAgreementSubjectSign/draftSiteInfo`, params)
}
// 单个保存签署位
export function singleSaveSiteInfo(params) {
  return API.post(`${preRecordURL}/file/fileOrderAgreementSubjectSign/singleSaveSiteInfo`, params)
}

// /一键删除
export function deleteAll(params) {
  return API.post(`${preRecordURL}/file/fileOrderAgreementSubjectSign/deleteAll`, params)
}
// /删除签章-单个
export function deleteSign(type, id) {
  return API.post(`${preRecordURL}/file/fileOrderAgreementSubjectSign/delete/${type}/${id}`)
}
// 获取签署方添加的角色
export function getRoleList(orderId) {
  return API.get(`${preRecordURL}/file/fileRecordOrder/getOrderSubjectIdentities/${orderId}`)
}
// 同步主体签章配置
export function syncSiteInfo(orderId) {
  return API.post(`${preRecordURL}/file/fileOrderAgreementSubjectSign/syncSiteInfo/${orderId}`)
}

export default {
  getFileList,
  deleteSignFile,
  getKeywordPosition,
  saveSiteInfo,
  querySiteInfos,
  querySiteInfo,
  draftSiteInfo,
  singleSaveSiteInfo,
  deleteAll,
  deleteSign,
  getRoleList,
  syncSiteInfo
}

