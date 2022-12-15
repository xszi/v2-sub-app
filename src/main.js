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
  // 重新部署后找不到静态资源导致跳转失败，触发自动刷新
  router.onError((error) => {
    console.error('error----------', error)
    const pattern = /Loading chunk (\d)+ failed/g
    console.error('router.onError---------------------------')
    const isChunkLoadFailed = error.message.match(pattern)
    console.error('isChunkLoadFailed', isChunkLoadFailed)
    const targetPath = router.history.pending.fullPath
    console.error('targetPath', targetPath)
    if (isChunkLoadFailed) {
      router.replace(targetPath)
    }
    window.location.reload()
  })
  // 正常实例化
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#sub-app') : '#sub-app')
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
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  router = null
}
