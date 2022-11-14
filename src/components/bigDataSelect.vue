<template>
  <el-select
    ref="bigSelect"
    v-loadmore="loadMore"
    v-bind="$attrs"
    :remote-method="remoteMethod"
    :value="value"
    clearable
    filterable
    remote
    class="ef-select"
    popper-class="bd-select-popper"
    :loading="loading"
    v-on="$listeners"
    @change="changeMethod"
    @visible-change="visibleChange"
    @input="$emit('input', $event)"
    @clear="clearMethod"
  >
    <!--考虑没有数据的处理 -->
    <template v-if="selectOpts && selectOpts.length > 0">
      <el-option v-for="item in selectOpts" :key="item.id" :label="item[optKey]" :value="item.id" />
      <div v-if="hasMore" class="load-more-text">滚动加载更多</div>
    </template>
    <el-option v-else label="暂无可选主体" value="-1" disabled />
  </el-select>
</template>

<script>
import { getIdentityList } from '@/api/recording'
import loadmore from '@/directive/loadmore'
export default {
  components: {},
  directives: { loadmore },
  props: {
    value: {
      type: String,
      default: () => ''
    },
    optKey: {
      type: String,
      default: 'label'
    },
    otherParams: {
      type: Object,
      default: () => {
        return {}
      }
    },
    subjectSubTypeText: { // 子主体类型
      type: [Number, String],
      default: ''
    }
  },
  data() {
    return {
      allData: [],
      filterData: [],
      selectOpts: [],
      curPage: 1,
      pageSize: 50,
      total: 0,
      query: '',
      timer: null,
      loading: false,
      hasMore: true
    }
  },
  watch: {
    subjectSubTypeText(val) {
      if (val) {
        this.curPage = 1
        this.selectOpts = []
        this.loadClientOpts()
      }
    }
  },
  mounted() {
    this.selectOpts = []
    if (this.value) {
      let clientName = this.value
      if (typeof this.value === 'object') {
        clientName = this.value.join(',')
      }
      this.loadClientOpts(clientName, 'init')
    }
    this.loadClientOpts()
  },
  methods: {
    loadClientOpts(subjectNameKeyWord = this.query, flag) {
      const { otherParams } = this
      const subjectType = otherParams.subjectType || ''
      const subjectSubType = otherParams.subjectSubType || Number(this.subjectSubTypeText) || ''
      const params = {
        subjectNameKeyWord,
        subjectType,
        subjectSubType: subjectSubType,
        pageInfo: {
          size: this.pageSize,
          current: this.curPage
        }
      }
      // page: this.curPage,
      // size: this.pageSize,
      getIdentityList(params)
        .then((res) => {
          const { code, data, message } = res
          if (code === 0) {
            const list = data.records || []
            const total = data.total

            this.selectOpts = this.selectOpts.concat(list)
            this.selectOpts = this.uniqueBy('id', this.selectOpts)
            // this.selectOpts = this.curPage === 1 ? list :this.selectOpts.concat(list)
            this.hasMore = this.selectOpts.length < total
            this.total = total
          } else {
            this.$message.error(message)
          }
        })
        .finally(() => (this.loading = false))
    },
    uniqueBy(key, array = []) {
      const cache = {}
      return array.reduce((uniqued, current) => {
        // eslint-disable-next-line
        (cache[current[key]] ? false : (cache[current[key]] = true)) && uniqued.push(current)
        return uniqued
      }, [])
    },
    changeMethod(val) {
      this.query = ''
      const selObj = this.selectOpts.filter(item => { return item.id === val })
      selObj.length > 0 && this.$emit('selectCon', selObj)
    },
    clearMethod() {
      this.loadClientOpts()
    },
    remoteMethod(query) {
      this.query = query
      this.loading = true
      this.selectOpts = []
      this.curPage = 1
      this.loadClientOpts()
    },
    visibleChange(flag) {
      if (flag && this.query) {
        this.query = ''
        this.curPage = 1
        this.selectOpts = []
        document.querySelector('.bd-select-popper  .el-scrollbar__thumb').scrollTo(0)
        this.loadClientOpts()
      }
      !flag && this.$refs.bigSelect.blur()
    },
    loadMore() {
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (this.curPage && this.hasMore) {
          this.curPage++
          this.loadClientOpts()
        }
      }, 500)
    }
  }
}
</script>
<style lang="scss" scoped>
.ef-select {
  ::v-deep.el-input__icon::before {
    content: '\e6e1';
  }
  ::v-deep.is-focus .el-input__icon {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
}
.ef-select:hover {
  ::v-deep.el-input__icon::before {
    content: '\E78D';
  }
}

.load-more-text {
  font-size: 12px;
  text-align: center;
  padding: 10px;
  color: #909399;
}
</style>
