/*
 * @Author: luoyang
 * @Date: 2019-08-10 14:05:43
 * @Last Modified by: luoyang
 * @Last Modified time: 2019-08-24 12:34:16
 */
<template>
  <v-toolbar color="rgba(0,0,0,0)" :clipped-left="clipped" :dark="outParallax" flat fixed>
    <v-toolbar-side-icon :style="{ color: $route.path == '/' ? '#000' : '' }" @click="handleSide" />
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppToolbar',
  computed: {
    ...mapGetters('app', [
      'offsetTop',
      'windowSize',
      'clipped',
      'drawer'
    ]),
    outParallax() { // 计算滚动高度是否低于顶部图片高度
      const height = (this.windowSize.x + this.windowSize.y) / 4
      if (this.offsetTop < height - 10) return true
      return false
    }
  },
  methods: {
    handleSide() {
      this.$store.dispatch('app/setDrawer', !this.drawer)
    }
  }
}
</script>
