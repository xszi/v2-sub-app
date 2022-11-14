import { API } from '@/service/api'
import { baseURL, orderURL } from './global_variable'

// /获取录单草稿列表
export function getDraftList(params) {
  return API.get(`${baseURL}/record/draft/selectPage`, params)
}

// /删除录单草稿
export function deleteDraftOrder(params) {
  return API.delete(`${baseURL}/record/draft/${params}`, params)
}

// /获取临时订单列表接口
export function getTempOrderList(params) {
  return API.get(`${baseURL}/record/temp/selectPage`, params)
}

// /获取录单主体列表
export function getLegalSubjectList(params) {
  return API.post(`${orderURL}/legal/legalSubjectInfo/list`, params)
}

// /获取服务产品列表
export function getLegalServiceList(params) {
  return API.get(`${baseURL}/product/getLegalServiceList`, params)
}

// /获取产品列表--带分页
export function getProductServiceList(params) {
  return API.get(`${baseURL}/product/getProductServicePage`, params)
}

// 获取服务产品对应的公证处
export function getServiceNotary(serviceCode) {
  return API.get(`${baseURL}/product/service/${serviceCode}/notaryConfigs`)
}

// /获取服务产品详情
export function getLegalServiceDetail(params) {
  return API.get(`${baseURL}/product/service/${params}`)
}

// 获取合同文书的链接
export function getPaperUrl(templateCode, templateVersion) {
  return API.get(`${baseURL}/system/template/openOffice/${templateCode}/${templateVersion}`)
}

// 获取动态表单的文件预览编辑接口
export function getDyPaperUrl(orderId, templateId) {
  return API.get(`${baseURL}/record/order/template/${orderId}/${templateId}`)
}

// 获取动态表单-地址组件的地址列表
export function getDyAddress(params) {
  return API.get(`${baseURL}/delivery/address/pageQuery`, params)
}
// 删除地址 - 动态表单-地址组件的地址
export function deleteAddress(addressId) {
  return API.delete(`${baseURL}/delivery/address/${addressId}`)
}

// 获取动态表单-名称：input框的可选主体 - 无分页、无材料信息
export function getDyUser(params) {
  return API.post(`${orderURL}/legal/legalSubjectInfo/allSubject`, params)
}

// 获取动态表单-名称：input框的可选主体 - 带分页、带材料信息
export function getIdentityList(params) {
  return API.post(`${orderURL}/legal/legalSubjectInfo/getPageSubject`, params)
}
export function getAuthorizeSubjectList(params) {
  return API.post(`${baseURL}/legal/legalSubjectInfo/getAuthorizeSubjectList`, params)
}

// 录单详情，校验步骤数据是否正确
export function validateStepInfo(orderId, stepId) {
  return API.post(`${baseURL}/record/order/check/${orderId}/${stepId}`)
}

// 录单详情，确认录单，生成正式订单
export function createRealOrder(orderId) {
  return API.post(`${baseURL}/record/order/comfirm/${orderId}`)
}

// 创建临时订单
export function createTmpOrder(params) {
  return API.post(`${baseURL}/record/createTempOrder`, params)
}

// 保存草稿
export function saveOrderDraft(orderId) {
  return API.put(`${baseURL}/record/draft/${orderId}`)
}

// 录单变更
export function recordOrderChange(orderId, params) {
  return API.post(`${baseURL}/record/order/${orderId}`, params)
}
// 创建订单批量提交接口
export function updateBatchRecordOrder(orderId, params) {
  return API.post(`${baseURL}/record/order/parts/${orderId}`, params)
}
// 获取创建订单所有步骤
export function getOrderSteps(orderId) {
  return API.get(`${baseURL}/record/order/steps/${orderId}`)
}
// 按步骤页面获取请求数据
export function getRecordStepInfos(stepId) {
  return API.get(`${baseURL}/record/order/step/${stepId}`)
}
// 获取录单详情接口
export function getRecordOrderDetail(orderId) {
  return API.get(`${baseURL}/record/detail/${orderId}`)
}
// 新增主体
export function addSubject(params) {
  return API.post(`${orderURL}/legal/legalSubjectInfo/addSubject`, params)
}
// 主体组件扫码上传更新主体信息
export function updateCodeInfos(params) {
  return API.post(`${baseURL}/legal/legalSubjectInfo/ocr/getSubject`, params)
}

export function ocrCreatOcrJob(params) {
  return API.post(`${baseURL}/legal/legalSubjectInfo/ocr/creatOcrJob`, params)
}

// PC-删除二维码主体信息
export function ocrRemoveSubject(params) {
  return API.post(`${baseURL}/legal/legalSubjectInfo/ocr/removeSubject`, params)
}

// 编辑主体
export function updateSubject(params) {
  return API.post(`${orderURL}/legal/legalSubjectInfo/updateSubject`, params)
}

// 删除主体
export function deleteSubject(params) {
  return API.post(`${orderURL}/legal/legalSubjectInfo/deleteSubject/${params}`, params)
}

// /主体详情
export function getSubjectDetail(params) {
  return API.post(`${orderURL}/legal/legalSubjectInfo/updateSubjectInfo/${params}`)
}

// 订单基础信息查询
export function getOrderInfo(data) {
  return API.post(`${orderURL}/orderBase/orderInfo`, data)
}

// 订单支付信息确认
export function getOrderPayInfo(data) {
  return API.post(`${orderURL}/orderBase/paymentConfirm`, data)
}

// 生成订单签署信息
export function createSignInfo(data) {
  return API.post(`${orderURL}/orderBase/createSignInfo`, data)
}

// 获取订单协同人员
export function getSynergyUser(params) {
  return API.get(`${baseURL}/record/synergy/user/${params}`, params)
}

// 获取base64文件接口
export function getBase64File(params) {
  return API.get(`${baseURL}/system/file/base64File/${params}`, params)
}

// 获取录单平台-公证订单-订单预审-公证处(下拉列表)
export function getFindOfficeOptionsList(params) {
  return API.get(`${baseURL}/system/office/pageNotaryOffice`, params)
}

// 获取录单平台-公证订单-订单归属机构
export function getFindClientsList(params) {
  return API.get(`${baseURL}/system/client/pageList`, params)
}

// 判断是否是运营终端
export function getIsOperationTerminal() {
  return API.get(`${baseURL}/system/user/isOperationTerminal`)
}

// 邀请签署方二维码接口
export function getCreateSignCode() {
  return API.get(`${orderURL}/legal/legalSubject/getSubjectUrl`)
}
