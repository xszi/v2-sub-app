<template>
  <el-select
    v-loadmore="loadMore"
    v-loading="loading"
    v-bind="$attrs"
    :remote-method="remoteMethod"
    :value="value"
    clearable
    filterable
    remote
    class="ef-select"
    popper-class="bd-select-popper"
    v-on="$listeners"
    @change="changeMethod"
    @visible-change="visibleChange"
    @input="$emit('input', $event)"
    @clear="clearMethod"
  >
    <template v-if="selectOpts && selectOpts.length > 0">
      <el-option v-for="item in selectOpts" :key="item[optValue]" :label="item[optKey]" :value="item[optValue]" />
      <div v-if="hasMore" class="load-more-text">滚动加载更多</div>
    </template>
    <el-option v-else label="暂无数据" value="-1" />
  </el-select>
</template>

<script>
import loadmore from '@/directive/loadmore'
export default {
  components: {},
  directives: { loadmore },
  props: {
    value: {
      type: String,
      default: () => ''
    },
    searchKey: {
      type: String,
      default: 'name'
    },
    optKey: {
      type: String,
      default: 'name'
    },
    optValue: {
      type: String,
      default: 'id'
    },
    otherParams: {
      type: Object,
      default: () => {
        return {}
      }
    },
    getSelectData: {
      type: Function,
      default: () => {
        return {}
      }
    },
    pageSize: {
      type: Number,
      default: () => {
        return 100
      }
    }
  },
  data() {
    return {
      allData: [],
      filterData: [],
      selectOpts: [],
      curPage: 1,
      total: 0,
      query: '',
      timer: null,
      loading: false,
      hasMore: true
    }
  },

  mounted() {
    this.selectOpts = []
    this.loadClientOpts()
  },
  methods: {
    async  loadClientOpts(flag) {
      const { otherParams, searchKey } = this
      const pageInfo = {
        size: this.pageSize,
        current: this.curPage, // 兼容产品列表分页名称
        page: this.curPage
      }
      try {
        const searchName = {}
        searchName[searchKey] = this.query
        let params = {}
        if (this.searchKey === 'legalServiceName') {
          params = Object.assign({}, searchName)
        } else {
          params = Object.assign({}, pageInfo, otherParams, searchName)
        }
        const { code, data, message } = await this.getSelectData(params)
        this.loading = false
        if (code === 0) {
          const list = data.records || data || []
          const { total } = data
          const tmpSelectOpts = this.curPage === 1 ? list : this.selectOpts.concat(list)
          this.selectOpts = this.uniqueBy(this.optValue, tmpSelectOpts)
          this.hasMore = this.selectOpts.length < total
          this.total = total
        } else {
          this.$message.error(message)
        }
      } finally {
        this.loading = false
      }
    },
    uniqueBy(key, array = []) {
      const cache = {}
      return array.reduce((uniqued, current) => {
        (cache[current[key]] ? false : (cache[current[key]] = true)) && uniqued.push(current)
        return uniqued
      }, [])
    },
    changeMethod(val) {
      this.query = ''
      const selObj = this.selectOpts.filter(item => { return item[this.optValue] === val })
      selObj.length > 0 && this.$emit('selectCon', selObj)
    },
    clearMethod() {
      this.curPage = 1
      this.query = ''
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
        if (this.selectOpts.length !== 0) {
          document.querySelector('.bd-select-popper  .el-scrollbar__thumb').scrollTo(0)
        }
        this.loadClientOpts()
      }
    },
    loadMore() {
      const { hasMore, curPage } = this
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (curPage && hasMore) {
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
