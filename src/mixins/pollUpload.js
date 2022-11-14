import { getOrCodeUrl, getSignFileInfoByToken, batchRemoveFile } from '@/api/huaweiObs'
import QRCode from 'qrcodejs2'
export default {
  data() {
    return {
      timer: null,
      refKey: '',
      elmId: '',
      mxUploadToken: ''
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    async mxGetOrCodeUrl(refKey = '', elmId = '') {
      if (!refKey || !elmId) return
      this.refKey = refKey
      this.elmId = elmId
      try {
        const { code, message, data } = await getOrCodeUrl()
        if (code !== 0) return this.$message.error(message)
        this.mxUploadToken = data.split('?token=')[1]
        this.creatQrCode(data)
        this.pollGetFiles()
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    },
    pollGetFiles() {
      clearTimeout(this.timer)
      this.timer = setTimeout(async() => {
        try {
          const { code, data1 } = await getSignFileInfoByToken(this.mxUploadToken)
          if (code !== 0) {
            return
          }
          const data = data1 || []
          data.forEach(item => {
            const bool = this.ruleForm.certificateFileIds.some(d => d.fileId === item.fileId)
            if (!bool) {
              const index = item.fileName.lastIndexOf('.')
              item.format = index > -1 ? item.fileName.slice(index) : ''
              this.ruleForm.certificateFileIds.push(item)
            }
          })
          const ids = data.map(d => d.fileId)
          if (ids.length) {
            const { code, message } = await batchRemoveFile(this.mxUploadToken, ids)
            if (code !== 0) {
              this.$message.error(message)
              return
            }
          }
          this.pollGetFiles()
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e)
        }
      }, 3500)
    },
    creatQrCode(url) {
      if (document.getElementById(this.elmId) != null) {
        document.getElementById(this.elmId).innerHTML = ''
      }
      setTimeout(() => {
        new QRCode(this.$refs[this.refKey], {
          text: url,
          width: 100,
          height: 100,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        })
      }, 500)
    }
  }
}
