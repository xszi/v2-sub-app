import './public-path'
import Vue from 'vue'
import VueRouter from 'vue-router'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import { constantRoutes } from './router/index'

// 全局组件
import commonComponents from '@/components/index.js'
Vue.use(commonComponents) // 导入全局组件
import '@/icons' // icon

// 全局过滤format
import filters from '@/utils/commonFilter'
// 添加全局filter
Object.keys(filters).map(v => {
  Vue.filter(v, filters[v])
})
import actions from '@/shared/actions'

import VueLazyload from 'vue-lazyload'
import 'default-passive-events' // 解决Chrome浏览器错误提示

Vue.use(VueLazyload)
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })

Vue.use(ElementUI)

// 修改 el-dialog 默认点击遮照为不关闭
ElementUI.Dialog.props.closeOnClickModal.default = false
import '@/utils/filter' // global filter

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

Vue.prototype.$pageRoute = function(name, params) {
  router.push({
    name,
    params
  })
}

let router = null
let instance = null

if (process.env.NODE_ENV === 'development') {
  const visitedViews = []
  sessionStorage.getItem('visitedViews', JSON.stringify(visitedViews))
}

// eslint-disable-next-line no-console
console.log('window.__POWERED_BY_QIANKUN__v3-sub-app', window.__POWERED_BY_QIANKUN__)

function render(props) {
  actions.setActions(props)
  let container = null
  if (props) {
    container = props.container
    Vue.prototype.$parRouter = props.parRouter
    sessionStorage.setItem('sign_frame_token', props.token)
  }
  router = new VueRouter({
    mode: 'history',
    routes: constantRoutes,
    base: window.__POWERED_BY_QIANKUN__ ? '/layout/v2-sub-app' : '/'
  })
  if (window.__POWERED_BY_QIANKUN__ && window.__CACHE_INSTANCE_BY_QIAN_KUN_FOR_VUE__) {
    // 有缓存实例
    const cachedInstance = window.__CACHE_INSTANCE_BY_QIAN_KUN_FOR_VUE__
    // 从最初的Vue实例上获得_vnode
    const cachedNode =
        // (cachedInstance.cachedInstance && cachedInstance.cachedInstance._vnode) ||
        cachedInstance._vnode
    // 让当前路由在最初的Vue实例上可用
    router.apps.push(...cachedInstance.$router.apps)
    // keepAlive可用
    cachedNode.data.keepAlive = true

    instance = new Vue({
      router,
      store,
      render: () => cachedNode
    })

    // 缓存最初的Vue实例
    instance.cachedInstance = cachedInstance

    router.onReady(() => {
      const { path } = router.currentRoute
      const { path: oldPath } = cachedInstance.$router.currentRoute
      // 当前路由和上一次卸载时不一致，则切换至新路由
      if (path !== oldPath) {
        cachedInstance.$router.push(path)
      }
    })
    instance.$mount('#app')
  } else {
    // 正常实例化
    instance = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount(container ? container.querySelector('#app') : '#app')
  }
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  // eslint-disable-next-line no-console
  console.log('vue app bootstraped')
}

export async function mount(props) {
  // eslint-disable-next-line no-console
  console.log('props from main framework', props)
  render(props)
}

export async function unmount() {
  const cachedInstance = instance.cachedInstance || instance
  window.__CACHE_INSTANCE_BY_QIAN_KUN_FOR_VUE__ = cachedInstance
  const cacahedNode = cachedInstance._vnode
  // 让keep-alive可用
  cacahedNode.data.keepAlive = true
  // 卸载当前实例，缓存的实例由于keep-alive生效，将不会真正被销毁，从而触发activated与deactivated
  instance.$destroy()
  router = null
  // instance.$el.innerHTML = ''
  // instance = null
}
