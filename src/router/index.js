import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* Layout */
import Layout from '@/layout'
/* 第1步----引入各个模块的路由配置*/
const requireRoutes = require.context('./module', true, /\.js$/)
const moduleRoutes = []
requireRoutes.keys().forEach(key => {
  moduleRoutes.push(requireRoutes(key).default)
})
export const constantRoutes = [{
  path: '/',
  component: Layout,
  redirect: '/nginx-prefix'
},
{
  path: '/nginx-prefix',
  component: Layout,
  redirect: '/nginx-prefix/nginx'
},
...moduleRoutes
]
// const createRouter = () =>
//   new Router({
//     mode: 'history',
//     scrollBehavior: () => ({ y: 0 }),
//     routes: constantRoutes
//   })

// const router = createRouter()

// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

// export default router
