import Layout from '@/layout'

const router = {
  path: '/nginx-prefix/nginx',
  component: Layout,
  redirect: '/nginx-prefix/nginx/desc',
  name: 'Nginx',
  meta: { title: 'nginx转发', icon: 'el-icon-s-help' },
  children: [{
    path: 'desc',
    name: 'CuteGirl',
    meta: { title: '可爱女人', icon: 'table' },
    component: () =>
      import ('@/views/nginx')
  }]
}
export default router
