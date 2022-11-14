
const ORDER_VAR_TYPE = {
  IS_ADD_COMMON_VAR: 1, // 新增普通变量
  IS_ADD_OTHER_VAR: 2, // 新增其他变量信息
  IS_DEL_COMMON_VAR: 3, // 删除普通变量
  IS_DEL_OTHER_VAR: 4, // 删除其他变量信息
  IS_SAVE_VAR: 0, // 保存草稿
  IS_SAVE_STEP: 3, // 预录订单保存
  IS_PRE_STEP: 1, // 上一步
  IS_NEXT_STEP: 2 // 下一步
}
const HAS_ALL_BTN = 1 // 只保留下一步
const HAS_NEXT_BTN = 2 // 所有按钮
const HAS_BACK_BTN = 3 // 返回按钮
const PARTY_BTN_TYPE = {
  IS_DELETE_SUBJECT: 1, // 删除主体信息
  IS_DELETE_OTHER: 2, // 删除其他配角
  IS_PARTY: 1, // 选择当事人
  IS_CUSTOM: 4, // 引用客户
  IS_EDIT_SUBJECT: 5, // 编辑主体信息
  IS_EDIT_OTHER: 6, // 编辑主体信息
  IS_CREATE: 7, // 创建经办人或者配偶
  IS_ADD_PERSON: 8, // 新增个人
  IS_ADD_ENTERPRISE: 9, // 新增企业
  IS_EDIT_PERSON: 10, // 编辑个人
  IS_EDIT_ENTERPRISE: 11, // 编辑企业
  IS_EDIT_SPOUSE: 12, // 编辑配偶
  IS_EDIT_TRANSACTOR: 13, // 编辑企业经办人
  IS_CREATE_TRANSACTOR: 14, // 新增经办人
  IS_CREATE_SPOUSE: 15 // 新增配偶

}

export {
  ORDER_VAR_TYPE,
  HAS_ALL_BTN,
  HAS_NEXT_BTN,
  HAS_BACK_BTN,
  PARTY_BTN_TYPE
}
