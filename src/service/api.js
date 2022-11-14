import request from './request'
import actions from '@/shared/actions'
import { Message } from 'element-ui'
const apiUrl = process.env.NODE_ENV !== 'development' ? process.env.VUE_APP_URL : process.env.VUE_APP_API_PROXY_PREFIX + '/'

// 签署流程工具后台管理api
export const API = {
  /**
   * @param {String} url 请求地址
   * @param {JSON} params 参数
   */
  get: async(url, params) => {
    const res = await getR(apiUrl + url, params)
    if (res.code === 0) {
      return res
    } else {
      Message({
        type: 'error',
        message: res.message
      })
      if (res.code === 10003) {
        window.location.replace(actions.actions.parAppUrl + '?noAuth=1')
      }
      return res
    }
  },
  /**
   * @param {String} url 请求地址
   * @param {JSON} params 参数
   */
  post: async(url, params, timeout = 30000) => {
    const res = await postR(apiUrl + url, params, timeout)
    if (res.code === 0) {
      return res
    } else {
      Message({
        type: 'error',
        message: res.message
      })
      if (res.code === 10003) {
        window.location.replace(actions.actions.parAppUrl + '?noAuth=1')
      }
      return res
    }
  },
  /**
   * @param {String} url 请求地址
   * @param {JSON} params 参数
   */
  put: async(url, params) => {
    const res = await putR(apiUrl + url, params)
    if (res.code === 0) {
      return res
    } else {
      Message({
        type: 'error',
        message: res.message
      })
      if (res.code === 10003) {
        window.location.replace(actions.actions.parAppUrl + '?noAuth=1')
      }
      return res
    }
  },
  /**
   * @param {String} url 请求地址
   * @param {JSON} params 参数
   */
  upload: async(url, params) => {
    const res = await uploadR(apiUrl + url, params)
    if (res.code === 0) {
      return res
    } else {
      Message({
        type: 'error',
        message: res.message
      })
      if (res.code === 10003) {
        window.location.replace(actions.actions.parAppUrl + '?noAuth=1')
      }
      return res
    }
  },
  /**
   * @param {String} url 请求地址
   * @param {JSON} params 参数
   */
  delete: async(url, params) => {
    const res = await deleteR(apiUrl + url, params)
    if (res.code === 0) {
      return res
    } else {
      Message({
        type: 'error',
        message: res.message
      })
      if (res.code === 10003) {
        window.location.replace(actions.actions.parAppUrl + '?noAuth=1')
      }
      return res
    }
  }
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function getR(url, params) {
  return new Promise((resolve, reject) => {
    request({
      url,
      method: 'get',
      params: params
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        // Message({
        //   type: 'error',
        //   message: '网络异常'
        // })
        reject(err)
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function postR(url, params, timeout) {
  return new Promise((resolve, reject) => {
    request({
      url,
      method: 'post',
      data: params,
      headers: { 'Content-Type': 'application/json; UTF-8' },
      timeout
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        // Message({
        //   type: 'error',
        //   message: '网络异常'
        // })
        reject(err)
      })
  })
}
/**
 * putR方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function putR(url, params) {
  return new Promise((resolve, reject) => {
    request({
      url,
      method: 'put',
      data: params,
      headers: { 'Content-Type': 'application/json; UTF-8' }
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        // Message({
        //   type: 'error',
        //   message: '网络异常'
        // })
        reject(err)
      })
  })
}
/**
 * upload方法，对应upload请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function uploadR(url, params) {
  return new Promise((resolve, reject) => {
    request.post(url, params, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        // Message({
        //   type: 'error',
        //   message: '网络异常'
        // })
        reject(err)
      })
  })
}

/**
 * deleteR方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function deleteR(url, params) {
  return new Promise((resolve, reject) => {
    request({
      url,
      method: 'delete',
      data: params
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        // Message({
        //   type: 'error',
        //   message: '网络异常'
        // })
        reject(err)
      })
  })
}
