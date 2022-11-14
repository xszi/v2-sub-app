const state = {
  isCreateTransActor: false, // 企业是否创建经办人
  isCreateSpouse: true // 个人是否创建配偶信息
}
const mutations = {
  SET_CREATE_TRANS_ACTOR: (state, val) => {
    state.isCreateTransActor = val
  },
  SET_CREATE_SPOUSE: (state, val) => {
    state.isCreateSpouse = val
  }

}

const actions = {
  setCreateTransActor({ commit }, val) {
    commit('SET_CREATE_TRANS_ACTOR', val)
  },
  setCreateSpouse({ commit }, val) {
    commit('SET_CREATE_SPOUSE', val)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

