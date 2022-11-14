import { API } from '@/service/api'
const state = {}

const mutations = {}

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
