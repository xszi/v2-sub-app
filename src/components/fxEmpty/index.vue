<template>
  <el-empty :image-size="72" :image="require('@/assets/images/record/empty-1.png')">
    <div slot="description" style="font-size: 12px; color: #333333">
      <div v-if="keyword">
        <div>没有找到【<span class="keyword">{{ keyword }}</span>】的相关信息</div>
        <div style="margin-top: 4px">试试换个词搜索</div>
      </div>
      <div v-else>{{ text }}</div>
    </div>
  </el-empty>
</template>

<script>
export default {
  name: 'FxEmpty',
  props: {
    keyword: { type: String, default: '' },
    text: { type: String, default: '暂无数据' }
  }
}
</script>

<style lang="scss" scoped>
.keyword {
  display: inline-block;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #3388FF;
  vertical-align: bottom;
  margin: 0 2px;
}
</style>
