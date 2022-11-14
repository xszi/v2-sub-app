// 获取指定目录下的指定格式的文件
const requireComps = require.context('./', false, /\.vue$/)
// 循环文件列表，全局注册
export default {
  install: function(Vue) {
    requireComps.keys().forEach(fileName => {
      const config = requireComps(fileName)
      const compName = fileName.replace(/\.\//, '').replace(/\.vue$/, '')
      Vue.component(compName, config.default || config)
    })
  }
}
