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
    <div id="wpsFrameId" ref="wpsFrame" style="width: 100%; height: 800px; overflow: visible" />
  </div>
</template>
<script>
import { initWebOfficeSdk } from '@/utils/sdk/index.js'

export default {
  props: {

    wpsBaseInfo: {
      type: Object,
      default: () => {
        return { token: '' }
      }
    },
    viwerPortH: {
      type: Number,
      default: () => { return 300 }
    }
  },
  data() {
    return {
      wpsUrl: ''
    }
  },
  mounted() {
    const { wpsBaseInfo } = this

    this.init(wpsBaseInfo)
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
      const frameDOM = this.$refs.wpsFrame
      // 或 const frameDOM = document.querySelector('#wpsFrameId')
      this.wps = initWebOfficeSdk({
        url: data.url,
        mount: frameDOM,
        token: data.token
      })
    },
    // 保存
    async save() {
      // const res1 = await save(this.wps)
      // res : { result: 'ok / onchange', version: 1, size: 27150, msgLength: 78 }
    },
    // 插入文本
    async insert() {
      // const data = {
      //   text: '插入文字内容',
      //   bookmarks: '书签名。书签名不能多于一个单词'
      // }
      // const res = await insertToWps(this.wps, data)
      // res : { result: 'success / error', version: 1 }
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
