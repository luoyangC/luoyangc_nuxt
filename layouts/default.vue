<template>
  <v-app
    v-scroll="onScroll"
    v-resize="onResize"
    :dark="dark"
    :style="`font-size: ${fontSize}px`"
    :class="[them, fontFamily]"
  >
    <!-- app侧边栏 -->
    <app-navbar />
    <!-- app顶栏 -->
    <app-toolbar />
    <!-- app主体 -->
    <app-main />
    <!-- app底栏 -->
    <app-footer />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import AppMain from '@/components/layouts/AppMain'
import AppNavbar from '@/components/layouts/AppNavbar'
import AppToolbar from '@/components/layouts/AppToolbar'
import AppFooter from '@/components/layouts/AppFooter'
export default {
  components: {
    AppMain,
    AppNavbar,
    AppToolbar,
    AppFooter
  },
  computed: {
    ...mapGetters('app', [
      'fontFamily',
      'fontSize',
      'them',
      'dark'
    ])
  },
  created() {
    this.initThem()
    this.getUserInfo()
    this.randomImage()
  },
  mounted() {
    this.onResize()
  },
  methods: {
    // 页面滚动时回调函数
    onScroll(e) {
      const offsetTop = window.pageYOffset || document.documentElement.scrollTop
      this.$store.dispatch('app/setOffsetTop', offsetTop)
    },
    // 窗口改变时回调函数
    onResize() {
      const windowSize = { x: window.innerWidth, y: window.innerHeight }
      this.$store.dispatch('app/setWindowSize', windowSize)
    },
    // 随机生成顶部图片
    randomImage() {
      this.$store.dispatch('app/setRandomImage')
    },
    // 初始化主题
    initThem() {
      this.$store.dispatch('app/setThem', 0)
    },
    // 获取用户信息
    async getUserInfo() {
      const { data } = await this.$axios.get(`/user/`)
      this.$store.dispatch('user/setCurrentUser', data)
    }
  }
}
</script>

<style lang="stylus">
.font-default
  font-family -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Apple Color Emoji, Arial, sans-serif, Segoe UI Emoji, Segoe UI Symbol
.font-Serif
  font-family Lyon-Text, Georgia, KaiTi, STKaiTi, '华文楷体', KaiTi_GB2312, '楷体_GB2312', serif
.font-mono
  font-family Nitti, Microsoft YaHei, '微软雅黑', monospace

.them-default
  background-color #fff !important
.them-medium
  background-image url('/style/dark.png') !important
  background-attachment fixed
.them-height
  background-image url('/style/light.png') !important
  background-attachment fixed
</style>
