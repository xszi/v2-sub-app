import { getPreRecordOrderInfo, getIsNotary } from '@/api/recordInitiation'
const state = {
  nextDisabled: false,
  nextLoading: false, // 下一步loading
  domNodeLoading: false,
  orderStepFold: false, // 默认展开订单步骤
  tempOrderId: '', // 预录订单id
  showStep: 1, // 当前步骤
  orderType: 3, // 3:预录单 5:公证员录单 4:文件发起
  timer: null,
  timer1: null,
  needPageStep: 1, // 是否展示送达信息
  isNotary: false, // 是否是公证处 false 非公证处
  haveVar: 1, // 录入参数是有变量
  timeout: 250, // 延迟250loading
  submitLoading: false, // 提交订单loading
  orderCode: sessionStorage.getItem('orderCode') ? sessionStorage.getItem('orderCode') : '', // 正式订单单号
  identityMaterials: [],
  uploading: false
}
const mutations = {
  SET_ORDER_TYPE: (state, val) => {
    state.orderType = val
  },
  SET_NEXT_DISABLED(state, val) {
    state.nextDisabled = val
  },
  SET_NEXT_lOADING: (state, val) => {
    // clearTimeout(state.timer)
    // if (val) {
    //   state.timer = setTimeout(() => {
    //     state.nextLoading = val
    //   }, state.timeout)
    //   return
    // }
    // clearTimeout(state.timer)
    state.nextLoading = val
  },
  SET_SUBMIT_LOADING: (state, val) => {
    state.submitLoading = val
  },
  SET_NODE_lOADING: (state, val) => {
    // clearTimeout(state.timer1)
    // if (val) {
    //   state.timer1 = setTimeout(() => {
    //     state.domNodeLoading = val
    //   }, state.timeout)
    //   clearTimeout(state.timer1)
    //   return
    // }
    state.domNodeLoading = val
  },
  SET_ORDER_FOLD: (state) => {
    state.orderStepFold = !state.orderStepFold
  },
  setTempOrderId: (state, val) => {
    state.tempOrderId = val
  },
  setShowStep: (state, val) => {
    state.showStep = val
  },
  SET_ORDER_CODE: (state, val) => {
    state.orderCode = val
    sessionStorage.setItem('orderCode', val)
  },
  SET_IDENTITY_MATERIALS: (state, val) => {
    state.identityMaterials = val
  },
  SET_PARAMS_HAS_VAR: (state, val) => {
    state.haveVar = val
  },
  SET_UPLOADING: (state, val) => {
    state.uploading = val
  },
  SET_IS_NOTARY: (state, val) => {
    state.isNotary = val
  },
  SET_PAPER_STEP: (state, val) => {
    state.needPageStep = val
  }

}

const actions = {
  setTempOrderId_({ commit }, val) {
    commit('setTempOrderId', val)
  },
  setShowStep_({ commit }, val) {
    commit('setShowStep', val)
  },
  setNextLoading({ commit, state }, val) {
    commit('SET_NEXT_DISABLED', val)
    clearTimeout(state.timer)
    if (val) {
      state.timer = setTimeout(() => {
        commit('SET_NEXT_lOADING', val)
      }, state.timeout)
    } else {
      commit('SET_NEXT_lOADING', val)
    }
  },

  setNodeLoading({ commit }, val) {
    commit('SET_NODE_lOADING', val)
  },
  setSubmitLoading({ commit }, val) {
    commit('SET_SUBMIT_LOADING', val)
  },

  setOrderFold({ commit }) {
    commit('SET_ORDER_FOLD')
  },
  setOrderType({ commit }, val) {
    commit('SET_ORDER_TYPE', val)
  },
  setOrderCode({ commit }, val) {
    commit('SET_ORDER_CODE', val)
  },
  setIdentityMaterials({ commit }, val) {
    commit('SET_IDENTITY_MATERIALS', val)
  },
  setPaperStep({ commit }, val) {
    commit('SET_PAPER_STEP', val)
  },
  getOrderBaseInfo({ commit, dispatch }, val) {
    return new Promise((resolve, reject) => {
      try {
        dispatch('setNextLoading', true)
        getPreRecordOrderInfo(val).then((res) => {
          if (res.code !== 0) return
          // 设置来源
          commit('SET_ORDER_TYPE', res.data.type)
          commit('SET_PARAMS_HAS_VAR', res.data.haveVar)
          resolve(res)
        })
      } finally {
        dispatch('setNextLoading', false)
      }
    })
  },
  getIsNotaryFun({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      try {
        dispatch('setNextLoading', true)
        getIsNotary().then((res) => {
          if (res.code !== 0) return
          // 设置来源
          commit('SET_IS_NOTARY', res.data)
          resolve(res)
        })
      } finally {
        dispatch('setNextLoading', false)
      }
    })
  },
  setUploading({ commit }, val) {
    commit('SET_UPLOADING', val)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

