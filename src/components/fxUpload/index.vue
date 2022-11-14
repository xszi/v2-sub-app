<template>
  <section class="fx-upload-component">
    <el-upload action="" :show-file-list="false" :before-upload="beforeUpload" :http-request="handleUpload" :style="{ width, height }" :disabled="isPreCheckVarFLag === 2 &&!editVar">
      <i class="el-icon-plus" style="font-size: 34px; color: #CFCFCF" />
    </el-upload>
  </section>
</template>
<script>
import $fileApi from '@/api/huaweiObs'
import { calculateMd5 } from '@/utils/fileObs'
import $axios from 'axios'
export default {
  name: 'FxUploadComponent',
  props: {
    isPreCheckVarFLag: {
      type: Number,
      default: 1 // 2 是校对区变量
    },
    extList: { type: Array, default: () => [] },
    width: { type: String, default: '130px' },
    height: { type: String, default: '90px' }
  },
  data() {
    return {}
  },
  methods: {
    beforeUpload(file) {
      if (!this.extList.length) return true
      const pointIndex = file.name.lastIndexOf('.')
      const ext = pointIndex > -1 ? file.name.slice(pointIndex + 1) : ''
      const extList = this.extList.reduce((arr, ext) => {
        ext = ext.replace('.', '').toLocaleLowerCase()
        arr.push(ext)
        return arr
      }, [])
      if (!extList.includes(ext.toLocaleLowerCase())) {
        this.$message.error(`仅支持${this.extList.join(',')}格式上传`)
        return false
      }
      return true
    },
    // 自定义上传
    async handleUpload(config) {
      try {
        const { file } = config
        const md5 = await calculateMd5(file)
        const params = { modelName: 'file', fileName: file.name, contentMD5: md5 }
        const res = await $fileApi.getUploadPath(params)
        if (res.code !== 0) return
        const { path, objectKey, contentType, contentMD5 } = res.data
        const headersConfig = contentMD5 ? { 'Content-Type': contentType, 'Content-MD5': contentMD5 } : { 'Content-Type': contentType }
        await $axios({ method: 'PUT', url: path, data: new Blob([file]), headers: headersConfig })
        const saveRes = await $fileApi.fileSave({ objectKey, fileName: file.name })
        if (saveRes.code !== 0) return
        file.fileId = saveRes.data
        this.$emit('success', file)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
<style lang="scss">
.fx-upload-component {
  .el-upload {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #CFCFCF;
    width: 100%;
    height: 100%;
  }
}
</style>
