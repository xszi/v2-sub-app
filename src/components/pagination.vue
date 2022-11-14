<template>
  <div class="pagination-container">
    <el-pagination
      v-if="total > 0"
      :page-sizes="pageSizes"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :pager-count="pagerCount"
      :current-page.sync="currentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 50, 100]
      }
    },
    pagerCount: {
      type: Number,
      default: 7
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentPage: 1, // 当前页码
      pageSize: 10 // 每页条数
    }
  },
  watch: {
    current(val) {
      this.currentPage = val
    },
    size: {
      handler(val, old) {
        if (val !== old) {
          this.pageSize = val
        }
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      const allPage = Math.ceil(this.total / this.pageSize)
      this.currentPage = this.currentPage <= allPage ? this.currentPage : 1
      this.$emit('pagination', { current: this.currentPage, size: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.$emit('pagination', { current: val, size: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}
</script>

<style scoped>
.pagination-container {
  text-align: right;
  background: #fff;
  padding: 20px 16px 0px 0;

  margin-top: 0;
}
.pagination-container.hidden {
  display: none;
}
</style>
