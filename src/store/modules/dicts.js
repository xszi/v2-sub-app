import { API } from '@/service/api'
import { baseURL, orderURL } from '@/api/global_variable'
const state = {
  clientList: [],
  productList: [],
  matterList: [],
  orderTerminalList: [],
  matters: [],
  subjectSubTypeList: [],
  maritalStatusList: [],
  certTypeList: [],
  certTypeDict: [],
  subjectSubType: {},
  nextLoading: false // 下一步loading
}

const mutations = {
  setNextLoading: (state, val) => {
    state.nextLoading = val
  },
  getClientList: (state, data) => {
    state.clientList = data
  },
  getProductList: (state, data) => {
    state.productList = data
  },
  getMatterList: (state, data) => {
    state.matterList = data
  },
  getOrderTerminalList: (state, data) => {
    state.orderTerminalList = data
  },
  setMatters: (state, data) => {
    state.matters = data
  },
  getSubjectSubTypeList: (state, data) => {
    state.subjectSubTypeList = data
  },
  getMaritalStatusList: (state, data) => {
    state.maritalStatusList = data
  },
  setCertTypeDict: (state, data) => {
    state.certTypeDict = data
  },
  getCertTypeList: (state, type) => {
    switch (type) {
      // /大陆自然人
      case 10:
        state.certTypeList = [{
          name: '公民身份证',
          code: 111
        },
        {
          name: '港澳居民来往内地通行证',
          code: 118
        }
        ]
        break
        // /非大陆自然人
      case 20:
        state.certTypeList = [{
          name: '护照',
          code: 115
        },
        {
          name: '港澳居民来往内地通行证',
          code: 118
        }
        ]
        break
        // /香港公司
      case 60:
        state.certTypeList = [{
          name: '统一社会信用代码',
          code: 126
        },
        {
          name: '营业执照注册号',
          code: 121
        }
        ]
        break
      default:
        state.certTypeList = [{
          name: '统一社会信用代码',
          code: 126
        }]
    }
  },
  getSubjectSubType: (state, type) => {
    state.subjectSubType = {
      '10': '大陆自然人',
      '20': '中国公民[非大陆自然人]',
      '30': '有限公司',
      '40': '合伙企业',
      '50': '个体工商户',
      '60': '香港公司',
      '70': '其他机构'
    }
  }
}

const actions = {
  // 提交材料下一步
  setOrderNextLoading: ({ commit }, val) => {
    commit('setNextLoading', val)
  },
  // /归属机构
  getSystemClient: ({ commit }) => {
    API.get(`${baseURL}/system/client/list`).then((res) => {
      commit('getClientList', res.data)
    })
  },
  // /获取产品列表
  getProductList: ({ commit }) => {
    API.get(`${baseURL}/product/getProductList`).then((res) => {
      commit('getProductList', res.data)
    })
  },
  // /获取公证事项列表
  getMatterList: ({ commit }) => {
    API.get(`${baseURL}/product/getMatterList`).then((res) => {
      commit('getMatterList', res.data)
    })
  },
  // /来源终端列表
  getOrderTerminalList: ({ commit }) => {
    API.get(`${baseURL}/product/getOrderTerminalList`).then((res) => {
      commit('getOrderTerminalList', res.data)
    })
  },
  // /存储已选公证事项
  setSelectMatters: ({ commit }, matters) => {
    commit('setMatters', matters)
  },
  // /录单主体类型
  getEntityType: ({ commit }) => {
    API.post(`${orderURL}/legal/legalSubjectInfo/subjectSubTypeList`)
      .then((res) => {
        commit('getSubjectSubTypeList', res.data)
      })
  },
  // /录单婚姻状况
  getMaritalStatus: ({ commit }) => {
    API.post(`${orderURL}/legal/legalSubjectInfo/maritalStatusList`).then((res) => {
      commit('getMaritalStatusList', res.data)
    })
  },
  // 录单证件类型- type传空，返回所有的
  getCertTypeDict: ({ commit }, type) => {
    const tempData = [
      { type: 2, name: '公民身份证', code: 111 },
      { type: 2, name: '临时居民身份证', code: 112 },
      { type: 2, name: '户口簿', code: 113 },
      { type: 2, name: '中国人民解放军军官证', code: 114 },
      { type: 2, name: '护照', code: 115 },
      { type: 2, name: '香港居民身份证', code: 116 },
      { type: 2, name: '澳门永久性居民身份证', code: 117 },
      { type: 2, name: '港澳居民来往内地通行证', code: 118 },
      { type: 2, name: '台湾居民来往大陆通行证', code: 119 },
      { type: 2, name: '其他', code: 120 },
      { type: 2, name: '士兵证', code: 123 },
      { type: 2, name: '台湾居民身份证', code: 124 },
      { type: 2, name: '律师证', code: 125 },
      { type: 2, name: '香港永久性居民身份证', code: 127 },
      { type: 2, name: '永久定居国外的中国公民护照', code: 128 },
      { type: 2, name: '澳门居民非永久性身份证', code: 129 },
      { type: 2, name: '香港特别行政区护照', code: 420 },
      { type: 2, name: '澳门特别行政区护照', code: 421 },
      { type: 2, name: '外国人永久居留证', code: 553 },
      { type: 2, name: '无证件号码', code: 999 },
      { type: 4, name: '其他', code: 120 },
      { type: 4, name: '营业执照注册号', code: 121 },
      { type: 4, name: '组织机构代码', code: 122 },
      { type: 4, name: '统一社会信用代码', code: 126 },
      { type: 4, name: '工商注册证', code: 127 },
      { type: 4, name: '工商执法证', code: 128 }
    ]
    commit('setCertTypeDict', tempData)
  },
  // /录单证件类型
  getCertTypeList: ({ commit }, type) => {
    commit('getCertTypeList', type)
  },
  // /录单主体子类型
  getSubjectSubType: ({ commit }) => {
    commit('getSubjectSubType')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
