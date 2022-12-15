<template>
  <div id="sub-app">
    <router-view v-if="isShow" />
  </div>
</template>

<script>
import actions from '@/shared/actions'
export default {
  name: 'App',
  data() {
    return {
      isShow: true
    }
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  mounted() {
    this.registerWatcher()
  },
  methods: {
    registerWatcher() {
      actions && actions.onGlobalStateChange((state, prevState) => {
        // 全局刷新
        // eslint-disable-next-line
        // if (state.agency !== prevState.agency) {
        //   window.location.reload()
        // }
      })
    },
    async reload() {
      this.isShow = false
      await this.$nextTick()
      this.isShow = true
    }
  }
}
</script>
<style lang="scss" scoped>
#sub-app {
  padding: 0;
  margin: 0
}
</style>
