<template>
  <div>
    <template v-if="fileList.length > 0">
      <el-row class="tip">文书预览</el-row>
      <el-row class="paper-wrapper">
        <el-col :span="6" class="paper-con">
          <el-table
            :data="fileList"
            class="table-wrapper"
          >
            <el-table-column
              :width="200"
              show-overflow-tooltip
              :prop="nameKey"
              align="center"
              label="文书名称"
            />
            <el-table-column
              align="center"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  :class="{'disabled':scope.row.preview < 1}"
                  :disabled="scope.row.preview < 1"
                  @click="showPaper(scope.$index, scope.row)"
                >查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>

        <el-col v-loading="viewLoading" :span="18" class="paper-con paper-dis" style="min-height:200px">
          <el-row>
            <iframe
              v-if="fileUrl.length > 0"
              id="mainIframe"
              ref="mainIframe"
              :style="'min-width:' + viwerWordW + 'px;border:none;' "
              :height="viwerWordH"
              allowfullscreen="true"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              :src="fileUrl"
            />
          </el-row>
        </el-col>
      </el-row>
    </template>
    <template v-else>
      <el-empty description="暂无合同文书" />
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getDyPaperUrl } from '@/api/recording'

export default {
  components: {
    // wpsPreview
  },
  props: {
    comData: {
      type: Array,
      default: () => { return [] }
    }
  },
  data() {
    return {
      codeKey: 'orderTemplateId',
      nameKey: 'templateName',
      orderId: this.$route.params.id,
      paperSel: [], // '1', '2', '3', '4'
      checkGRefName: 'checkListEle',
      fileInfo: {},
      viewLoading: false, // 查看合同loading
      fileUrl: '', // 文件的链接
      wpsBaseInfo: false
    }
  },
  computed: {
    viwerWordH() {
      const currentH = window.innerHeight || document.documentElement.clientHeight
      return currentH - 300
    },
    viwerWordW() {
      const currentW =
        window.innerWidth || document.documentElement.clientWidth
      return currentW - 400
    },
    fileList() {
      return this.comData[0].metaVarVOS
    },
    ...mapState('dicts', ['matters'])
  },

  methods: {
    /**
     * 点击左侧公证事项中的文书，在右侧展示pdf或者word
     */
    async showPaper(rowIdx, paper) {
      this.viewLoading = true
      try {
        const { codeKey, orderId } = this
        const that = this
        this.fileUrl = ''
        this.viewLoading = true
        const templateId = paper[codeKey]

        const { data } = await getDyPaperUrl(orderId, templateId)
        that.fileInfo = data
        if (['docx', 'doc'].indexOf(data.fileType) > -1) {
          const tmpWpsBaseInfo = {
            token: data.token,
            url: data.editorUrl
          }
          this.$set(this, 'wpsBaseInfo', tmpWpsBaseInfo)
        }
        this.viewLoading = false
        that.fileUrl = data.editorUrl
      } finally {
        this.viewLoading = false
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.tip {
  line-height: 26px;
  font-weight: bold;
  font-size: 1rem;
  text-align: left;
  color: #243042;
  margin-top: 30px;
  margin-bottom: 8px;
}
.title {
  color: #243042;
  font-size: 18px;
  line-height: 20px;
  margin-bottom: 30px;
  display: flex;
  .b-line {
    width: 3px;
    height: 20px;
    margin-right: 10px;
    background: linear-gradient(#38f 0%, #0966e8 100%);
    display: inline-block;
  }
}
.paper-wrapper {
  border-top: 1px solid #e6e6e6;
  .paper-con {
    padding-top: 16px;
  }
  .paper-line {
    border-left: 1px solid #e6e6e6;
    padding-left: 14px;
  }
  .paper-dis {
    padding-left: 16px;
  }
}
.table-wrapper{
  width: 100%;
  border: 1px solid #e6e6e6;
  ::v-deep .el-table__header tr th{
    height: 40px;
    background: #f4f5fa ;
  }
}

</style>
