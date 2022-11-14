<template>
  <div>
    <!-- <iframe
      v-if="wpsUrl"
      id="mainIframe"
      ref="mainIframe"
      :style="'min-width:'+ viwerWordW +'px;overflow: visible'"
      :height="viwerWordH"
      allowfullscreen="true"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      :src="wpsUrl"
    /> -->
    <div id="wpsFrameId" ref="wpsFrame" :style="{ width: '100%', height: viwerPortH, overflow: 'visible' }" />
  </div>
</template>
<script>
import { initWebOfficeSdk, insertToWps, save } from '../../static/wps'

export default {
  props: {
    readOnly: { type: Boolean, default: false },
    wpsBaseInfo: {
      type: Object,
      default: () => {
        return { token: '' }
      }
    },
    viwerPortH: {
      type: String,
      default: () => { return '600px' }
    }
  },
  data() {
    return {
      wpsUrl: ''
    }
  },
  mounted() {
    this.init(this.wpsBaseInfo)
  },
  methods: {
    // // 自己初始化wps
    // init1() {
    //   const { wpsBaseInfo } = this
    //   const frameDOM = this.$refs.wpsFrame
    //   this.wps = WebOfficeSdk.config({
    //     mount: frameDOM,
    //     url: wpsBaseInfo.url
    //   })
    //   this.wps.setToken({
    //     token: wpsBaseInfo.token
    //   })
    // },

    // 使用封装方法初始化wps
    init(data) {
      const frameDOM = this.$refs.wpsFrame || document.querySelector('#wpsFrameId')
      // const frameDOM = document.querySelector('#wpsFrameId')
      this.wps = initWebOfficeSdk({
        url: data.url,
        commonOptions: {
          isShowTopArea: !this.readOnly
        },
        AllowReadingMode: true,
        mount: frameDOM,
        token: data.token
      })
    },
    // 保存
    async save() {
      await save(this.wps)
      // res : { result: 'ok / onchange', version: 1, size: 27150, msgLength: 78 }
    },
    // 插入文本
    async insert() {
      const data = {
        text: '插入文字内容',
        bookmarks: '书签名。书签名不能多于一个单词'
      }
      await insertToWps(this.wps, data)
      // res : { result: 'success / error', version: 1 }
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
