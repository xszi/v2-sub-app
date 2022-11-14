<template>
  <el-dialog
    class="fx-custom-dialog fx-file-detail-dialog"
    title="文件查看"
    :visible.sync="value"
    append-to-body
    :width="file.fileType === 'audio' ? '500px' : '1100px'"
    :before-close="handleClose"
  >
    <div v-loading="loading" :style="{ height: loading ? '300px' : '' }">
      <wps v-if="wpsFlag && wpsBaseInfo.url" :wps-base-info="wpsBaseInfo" :viwer-port-h="600" :read-only="true" />
      <iframe v-if="file.fileType === 'txt'" class="txt-iframe" :src="filePath" />
      <video v-if="file.fileType === 'video'" :src="filePath" :onerror="pathError" controls height="550px" width="100%" />
      <div v-if="file.fileType === 'audio'" style="height: 160px; line-height: 180px; text-align: center">
        <audio :src="filePath" :onerror="pathError" controls />
      </div>
    </div>
  </el-dialog>
</template>
<script>
import wps from '@/components/wpsPreview'
import $fileApi from '@/api/huaweiObs'
export default {
  name: 'FxFileDetailDialog',
  components: { wps },
  model: { prop: 'value', event: 'update:value' },
  props: {
    value: { type: Boolean, default: false },
    file: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      loading: false,
      filePath: '',
      wpsFlag: false,
      wpsBaseInfo: {}
    }
  },
  computed: {

  },
  watch: {
    value(v) {
      if (v) {
        this.wpsFlag = ['pdf', 'word', 'ppt'].includes(this.file.fileType)
        this.wpsFlag && this.openReadWps()
        const { url, path, filePath } = this.file
        this.filePath = url || filePath || path
      } else {
        this.wpsBaseInfo = {}
        this.filePath = ''
      }
    }
  },
  methods: {
    pathError() {
      this.$message.error('资源加载失败')
    },
    // 打开wps
    async openReadWps() {
      try {
        this.loading = true
        const res = await $fileApi.getOfficeReadUrl({ fileId: this.file.fileId })
        if (res.code !== 0) return
        this.wpsBaseInfo = { url: res.data }
      } finally {
        this.loading = false
      }
    },
    async handleClose() {
      this.$emit('update:value', false)
      setTimeout(() => {
        this.$emit('update:file', {})
      }, 100)
    }
  }
}
</script>
<style lang="scss">
.fx-file-detail-dialog {
  .txt-iframe {
    border: none;
    width: 100%;
    height: 450px;
  }
}
</style>
