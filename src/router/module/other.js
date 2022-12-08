
import Layout from '@/layout'

const router = {
  path: '/nginx-prefix/other',
  component: Layout,
  redirect: '/nginx-prefix/other/desc',
  name: 'Other',
  meta: { title: '其他', icon: 'el-icon-s-help' },
  children: [{
    path: 'desc',
    name: 'BlackHumor',
    meta: { title: '黑色幽默', icon: 'table' },
    component: () =>
      import ('@/views/other')
  }]
}
export default router
