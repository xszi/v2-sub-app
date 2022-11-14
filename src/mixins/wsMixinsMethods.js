import { initQDWS, registerListner } from '@/service/qdWebSocket'

export const wsMixinsMethods = {
  // 定义data数据
  data() {
    return {
      refreshDataWS: null
    }
  },
  methods: {
    // 注册ws
    registerWS(websocketUrl) {
      const vm = this
      vm.refreshDataWS = initQDWS(websocketUrl)
      registerListner(vm.refreshDataWS,
        {
          open: vm.websocketonopen,
          error: vm.websocketonerror,
          message: vm.websocketonmessage,
          close: vm.websocketclose
        })
      return vm.refreshDataWS
    },
    websocketonopen() {
      // eslint-disable-next-line no-console
      console.info('连接成功')
    },
    // 连接建立失败重连
    websocketonerror() {
      // eslint-disable-next-line no-console
      console.info('连接失败')
    },
    // 数据接收后执行的操作
    websocketonmessage(e) {
      try {
        const info = JSON.parse(e)
        // eslint-disable-next-line no-console
        console.info(`消息推送===${info}`)
        this.wsOnMessage(info)

        // eventBus.$emit('wsRefreshAssemblyData', info)// 更改数据
      } catch (event) {
        // eslint-disable-next-line no-console
        console.info(`消息推送========${event}`)
      }
    },
    // 发送消息
    websocketsend(Data) { // 数据发送
      this.refreshDataWS.send(JSON.stringify(Data))
    },
    // 关闭连接
    websocketclose(e) { // 关闭
      console.info('断开连接', e)
    }
  }
}
