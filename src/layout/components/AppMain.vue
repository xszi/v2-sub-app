<template>
  <section class="micro-app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :max="20">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    },
    cachedViews() {
      const fixedCachedViews = ['CuteGirl, BlackHumor']
      return fixedCachedViews
    }
  }
}
</script>

<style scoped lang="scss">
.app-main {
  /*50 = navbar  */
  height: calc(100vh - 90px);
  width: 100%;
  position: relative;
  overflow-y:auto;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>
