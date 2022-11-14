import { API } from '@/service/api'
import { baseURL, preRecordURL, orderURL, frameURL } from './global_variable'
const timeout = 60000
function dealData(data) {
  return {
    ...data,
    appType: 'financialEsnotary'
  }
}
// /获取服务产品列表
export function getLegalServiceList(params) {
  return API.get(`${baseURL}/product/getLegalServiceList`, params)
}
// 预录订单基本信息
export function getPreRecordOrderInfo(tempOrderId) {
  return API.get(`${preRecordURL}/pre/preRecordOrder/pc/getOrderInfo/${tempOrderId}`)
}
// 获取录单平台-公证订单-订单预审-公证处(下拉列表)
export function getFindOfficeOptionsList(params) {
  return API.get(`${baseURL}/system/office/pageNotaryOffice`, params)
}
// 获取服务产品对应的公证处
export function getServiceNotary(serviceCode) {
  return API.get(`${baseURL}/product/service/${serviceCode}/notaryConfigs`)
}
// step2 事项公证文书列表
export function getMatterTemplates(orderId) {
  return API.get(`${preRecordURL}/pre/recordOrder/getMatterTemplates/${orderId}`)
}
// 保存文书接口
export function saveMatterTemplates(params) {
  return API.post(`${preRecordURL}/pre/recordOrder/saveMatterTemplates`, params)
}

// 创建临时订单
export function createTmpOrder(params) {
  return API.post(`${preRecordURL}/pre/recordOrder/createOrder`, params)
}

// /获取服务产品详情
export function getLegalServiceDetail(params) {
  return API.get(`${baseURL}/product/service/${params}`)
}

// 获取动态表单-地址组件的地址列表
export function getDyAddress(params) {
  return API.get(`${baseURL}/delivery/address/pageQuery`, params)
}
// 删除地址 - 动态表单-地址组件的地址
export function deleteAddress(addressId) {
  return API.delete(`${baseURL}/delivery/address/${addressId}`)
}

/**
 * 订单基本信息
 * @param orderId	是	string	订单id
 * @returns
 */
export function getOrderInfo(data) {
  return API.post(`${orderURL}/orderBase/orderInfo`, data)
}

/**
 * step1 公证案例列
 * @returns
 */
export function getOrderMatterList(tempOrderId) {
  return API.get(`${preRecordURL}/pre/preRecordOrder/getOrderMatters/${tempOrderId}`)
}
/**
 * step2 保存 公证案例列
 * @returns
 */
export function saveOrderMatterList(data) {
  return API.post(`${preRecordURL}/pre/recordOrder/selectMatters`, data)
}
// step2 获取合同文书的链接
export function getPaperUrl(templateCode, templateVersion) {
  return API.get(`${baseURL}/system/template/openOffice/${templateCode}/${templateVersion}`)
}
/**
 * step3 当事人 删除录单主体信息接口
 * @returns
 */
export function removeSubjectInfo(data) {
  return API.post(`${preRecordURL}/pre/preRecordOrderSubject/remove`, data)
}
/**
 * step3 当事人 删除录单主体管理参数 比如配偶，经办人等信息接口
 * @returns
 */
export function removeSubjectRelation(data) {
  return API.post(`${preRecordURL}/pre/preRecordOrderSubject/removeRelation`, data)
}
export function removeOtherSubject(data) {
  return API.post(`${preRecordURL}/pre/preRecordOrderSubject/remove`, data)
}
/**
 * step6 获取承办公证员
 * @returns
 */
export function findNotaryForOptions(orderId) {
  return API.get(`${orderURL}/order/operation/findNotaryForOptions/${orderId}`)
}

/**
 * step6 修改承办公证员
 * @returns
 */
export function updateOrderNotary(data) {
  return API.post(`${orderURL}/order/operation/updateOrderNotary`, data)
}

/**
 * step6 获取承办人
 * @returns
 */
export function findUserForOptions(orderId) {
  return API.get(`${orderURL}/order/operation/findUserForOptions/${orderId}`)
}

/**
 * step6 修改承办人
 * @returns
 */
export function updateOrderUnder(data) {
  return API.post(`${orderURL}/order/operation/updateOrderUnder`, data)
}

/**
 * step3 保存公证事项案例变量组及变量接口
 * @returns
 */
export function saveOrderMatterVarGroups(params) {
  return API.post(`${preRecordURL}/pre/recordOrder/saveOrderMatterVarGroups`, params)
}

// 拷贝一个变量组(不保存)

export function addVarGroups(params) {
  return API.post(`${preRecordURL}/pre/preRecordOrderVarGroup/copyGroupNotSave`, params)
}

/**
 * step6 查询公证事项案例变量组及变量接口
 * @returns
 */
export function getOrderMatterVarGroups(params) {
  return API.post(`${preRecordURL}/pre/recordOrder/getMatterVarGroups`, params)
}

/**
 * step7 送达信息
 * @returns
 */
export function getMetaAddress(tempOrderId) {
  return API.get(`${preRecordURL}/pre/preRecordOrderMetaAddress/getMetaAddress/${tempOrderId}`)
}

/**
 * step6 保存地址组件信息
 * @returns
 */
export function saveMetaAddress(params) {
  return API.post(`${preRecordURL}/pre/preRecordOrderMetaAddress/saveMetaAddress`, params, timeout)
}

/**
 * 金额修改
 * @param orderId	是	string	订单id
 * @returns
 */
export function findMatterPayment(orderId) {
  return API.get(`${orderURL}/order/operation/findMatterPayment/${orderId}`)
}

/**
 * 批量支付费用修改
 * @param id	是	string	费用id
 * @param amount	是	string	总价
 * @returns
 */
export function batchUpdateEsnotaryOrderPaymentDetail(data) {
  return API.post(`${orderURL}/order/operation/batchUpdateEsnotaryOrderPaymentDetail`, data)
}

/**
  生成签署二维码
 * @returns
 */
export function createSignInfo(data) {
  return API.post(`${orderURL}/orderBase/createSignInfo`, data)
}

/**
 预览文书接口
 * @returns
 */
export function getPreviewMatterTemplates(orderId) {
  return API.get(`${preRecordURL}/pre/recordOrder/getPreviewMatterTemplates/${orderId}`)
}

/**
 公证文书预览接口
 * @returns
 */
export function previewOrderTemplate(data) {
  return API.post(`${preRecordURL}/pre/preRecordOrder/previewOrderTemplate`, data)
}
// 创建正式订单
export function createComOrder(orderId) {
  return API.post(`${preRecordURL}/pre/preRecordOrder/comfirm/${orderId}`)
}

/**
 材料列表接口
 * @returns
 */
export function getMatterMateriales(orderId) {
  return API.get(`${preRecordURL}/pre/recordOrder/getMatterMateriales/${orderId}`)
}

export function getIsNotary() {
  return API.get(`${frameURL}/frame/getIsNotary`)
}

export function saveMatterMaterial(data) {
  return API.post(`${preRecordURL}/pre/recordOrder/saveMatterMaterial`, data)
}

export function sortMatterMaterial(data) {
  return API.post(`${preRecordURL}/pre/recordOrder/sortMatterMaterial`, data)
}

export function getOrderPartiesInfo(tempOrderId) {
  return API.get(`${preRecordURL}/pre/preRecordOrder/getOrderPartiesInfo/${tempOrderId}`)
}

export function delMatterMaterial(data) {
  return API.post(`${preRecordURL}/pre/recordOrder/delMatterMaterial`, data)
}

export function getOrderMatterIdentitySubjects(data) {
  return API.post(`${preRecordURL}/pre/preRecordOrder/getOrderMatterIdentitySubjects`, data)
}

export function saveOrderMatterIdentitySubjects(data) {
  return API.post(`${preRecordURL}/pre/preRecordOrder/saveOrderMatterIdentitySubjects`, data)
}

// 获取预录单身份主体列表
export function getIdentitySubjectInfos(data) {
  return API.post(`${preRecordURL}/pre/preRecordOrderSubject/getIdentitySubjectInfos`, dealData(data))
}
// 客户-获取预录单其他客户主体列表
export function getOtherSubjectInfos(data) {
  return API.post(`${preRecordURL}/pre/preRecordOrderSubject/getOtherSubjectInfos`, dealData(data))
}
// 获取签署方列表
export function getSignotaryPage(data) {
  return API.post(`${preRecordURL}/pre/preRecordOrderSubject/signotary/page`, dealData(data))
}
// 添加录单主体
export function addOrderSubjects(data) {
  return API.post(`${preRecordURL}/pre/preRecordOrderSubject/addOrderSubjects`, dealData(data))
}
// 客户-获取预录单未选公共主体客户主体
export function getUnselectedSubjectInfos(data) {
  return API.post(`${preRecordURL}/pre/preRecordOrderSubject/getUnselectedSubjectInfos`, dealData(data))
}
export function commonSubjectIdentityChange(data) {
  return API.post(`${preRecordURL}/pre/commonSubjectIdentity/changeSelected`, dealData(data))
}
// 客户-获取录单主体明细
export function getOrderSubjectDetail(data) {
  return API.post(`${preRecordURL}/pre/preRecordOrderSubject/getOrderSubjectDetail`, dealData(data))
}
// 新增、编辑主体保存
export function saveOrderSubjects(data) {
  return API.post(`${preRecordURL}/pre/preRecordOrderSubject/saveOrderSubjects`, dealData(data))
}
export function getAuthorizeSubjects(data) {
  return API.post(`${preRecordURL}/pre/preRecordOrderSubject/getAuthorizeSubjects`, dealData(data))
}
// 客户-企业ocr接口
export function getOcrInfoByUnified(data) {
  return API.post(`${preRecordURL}/pre/preRecordOrderSubject/getOcrInfoByUnified`, dealData(data))
}
// 客户-个人ocr接口
export function getOcrInfoByIdCard(data) {
  return API.post(`${preRecordURL}/pre/preRecordOrderSubject/getOcrInfoByIdCard`, dealData(data))
}

// 获取预录单是否需要配偶接口
export function getIsSpouse(orderId) {
  return API.post(`${preRecordURL}/pre/preRecordOrder/getIsSpouse/${orderId}`, dealData({}))
}
export function vaildOrderSubject(data) {
  return API.post(`${preRecordURL}/pre/preRecordOrderSubject/vaildOrderSubject`, dealData(data))
}
// 获取客户主体详情列表
export function signotaryDetailPage(data) {
  return API.post(`${preRecordURL}/pre/preRecordOrderSubject/signotary/detailPage`, dealData(data))
}
// 保存草稿接口
export function saveDraft(id) {
  return API.post(`${preRecordURL}/pre/preRecordOrder/saveDraft?id=${id}`)
}

/**
 * 新订单基本信息
 * @param orderId	是	string	订单id
 * @returns
 */
export function getFileSignOrderInfo(orderId) {
  return API.get(`${preRecordURL}/file/fileRecordOrder/queryOrderInfo/${orderId}`)
}

export default {
  getIdentitySubjectInfos,
  getOtherSubjectInfos,
  getSignotaryPage,
  removeSubjectRelation,
  removeSubjectInfo,
  removeOtherSubject,
  vaildOrderSubject,
  saveDraft,
  commonSubjectIdentityChange
}
