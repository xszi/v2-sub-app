<template>
  <section class="fx-file-item-component">
    <div v-if="file.fileId" class="file-wrap" :title="cloneFile.fileName" @click="fileTap(cloneFile)">
      <el-image
        :key="cloneFile.fileId"
        v-loading="loading"
        class="file-image"
        fit="fill"
        :src="isImage ? (cloneFile.filePath) : fileTypeIcons[fileType]"
        :preview-src-list="isImage ? [cloneFile.filePath] : []"
        :style="{ width, height }"
      />
    </div>
    <div v-if="showFileName" class="file-name">{{ file.fileName ? file.fileName:'--' }}</div>
    <!--文件查看-->
    <file-detail-dialog v-model="fileVisible" :file="cloneFile" />
  </section>
</template>
<script>
import FileDetailDialog from '@/components/fileDetailDialog'
import $fileApi from '@/api/huaweiObs'
import { getFileType, fileTypeIcons } from '@/utils'
import { cloneDeep } from 'lodash'

export default {
  name: 'FxFileItemComponent',
  components: { FileDetailDialog },
  props: {
    width: { type: String, default: '26px' },
    height: { type: String, default: '30px' },
    file: { type: Object, default: () => ({}) },
    showFileName: { type: Boolean, default: false }
  },
  data() {
    return {
      fileTypeIcons,
      fileVisible: false,
      loading: false,
      cloneFile: {}
    }
  },
  computed: {
    fileType() {
      let format = this.cloneFile.format || this.cloneFile.fileFormat || ''
      format = format.replace('.', '')
      return this.getFileType(format)
    },
    isImage() {
      return this.fileType === 'image'
    }

  },
  watch: {
    file: {
      handler() {
        this.fileInit()
      },
      deep: true,
      immediate: true
    }
  },
  async created() { },
  methods: {
    getFileType,
    async fileInit() {
      try {
        const cloneFile = cloneDeep(this.file)
        if (!cloneFile.filePath) {
          // 解決fileid 為 []
          if (cloneFile.fileId === '' || cloneFile.fileId === '[]') {
            return
          }
          this.loading = true
          const res = await $fileApi.getObsFileUrl(cloneFile.fileId)
          if (res.code !== 0) return
          const { path, fileName } = res.data
          cloneFile.filePath = path
          if (!cloneFile.fileName) cloneFile.fileName = fileName
        }
        if (!cloneFile.format && !cloneFile.fileFormat) {
          const index = (cloneFile.fileName || '').lastIndexOf('.')
          cloneFile.format = index > -1 ? cloneFile.fileName.slice(index + 1) : ''
        }
        this.cloneFile = cloneFile
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    fileTap() {
      if (!this.cloneFile.filePath) {
        this.$message.error('文件url不存在')
        return
      }
      if (this.loading) return
      if (this.isImage) return
      if (['zip', 'other'].includes(this.fileType)) {
        return window.open(this.cloneFile.filePath)
      }
      Object.defineProperty(this.cloneFile, 'fileType', { value: this.fileType })
      this.fileVisible = true
    }
  }
}
</script>
<style lang="scss">
.fx-file-item-component {
  .file-wrap {
    display: flex;
    align-items: center;
  }

  .file-image {
    cursor: pointer;
    flex-shrink: 0;
    vertical-align: bottom;
  }
  .file-name{
    font-size: 12px;
    font-weight: 400;
    color: #555555;
    text-align: center;
    padding: 8px 0;
  }
}
</style>
