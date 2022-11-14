import { API } from '@/service/api'
const state = {
  fileList: [],
  curFile: {},
  subjectList: [],
  pageLoading: false,
  btnSaveLoading: false,
  btnNextLoading: false,
  btnDialogLoading: false,
  orderId: '',
  orderCode: '',
  curStep: 0
}

const mutations = {
  setOrderId: (state, data) => {
    state.orderId = data
  },
  setOrderCode: (state, data) => {
    state.orderCode = data
  },
  setFileList: (state, data) => {
    state.fileList = data
  },
  setCurFile: (state, data) => {
    state.curFile = data
  },
  setSubjectList: (state, data) => {
    state.subjectList = data
  },
  setPageLoading: (state, data) => {
    state.pageLoading = data
  },
  setBtnLoading: (state, data) => {
    state[data.btn] = data.value
  },
  setCurStep: (state, data) => {
    state.curStep = data
  }
}

const actions = {
  getUserInfo({ commit }, code) {
    return API.get(`rest/notarycloud/user/getUserInfo/${code}`)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
