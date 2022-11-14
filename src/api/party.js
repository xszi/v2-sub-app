
import { API } from '@/service/api'
import { preRecordURL } from './global_variable'
// step3 客户 - 获取预录单其他客户主体列表
export function getOtherSubjectInfos(params) {
  return API.post(`${preRecordURL}pre/preRecordOrderSubject/getOtherSubjectInfos`, params)
}

// step3 客户-删除其他客户预录单主体接口
export function removeSubjectInfos(params) {
  return API.post(`${preRecordURL}/pre/preRecordOrderSubject/remove`, params)
}
