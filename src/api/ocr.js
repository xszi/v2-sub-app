import { API } from '@/service/api'
import { preRecordURL } from './global_variable'
// 个人ocr接口
export async function getOcrInfoByIdCard(params) {
  return await API.post(`${preRecordURL}/pre/preRecordOrderSubject/getOcrInfoByIdCard`, params)
}
// 企业ocr接口
export async function getOcrInfoByUnified(params) {
  return await API.post(`${preRecordURL}/pre/preRecordOrderSubject/getOcrInfoByUnified`, params)
}
