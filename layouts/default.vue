<template>
  <v-app 
    v-scroll="onScroll"
    v-resize="onResize"
    :dark="dark"
    :style="`font-size: ${fontSize}px`"
    :class="{them, font}"
  >

    <app-navbar />    

    <app-toolbar />

    <app-main />

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
    // 获取接口数据
    async getData() {
      // 获取用户信息
      const { data } = await this.$axios.get(`/user/`)
      this.$store.dispatch('user/setCurrentUser', data)
    }
  },
  computed: {
    ...mapGetters('app', [
      'fontSize',
      'font',
      'them',
      'dark'
    ])
  },
  created() {
    this.initThem()
    this.getData()
    this.randomImage()
  },
  mounted() {
    this.onResize()
  },
};
</script>

<style lang="stylus">
.v-navigation-drawer
  transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important

.font-slider
  display flex
  align-items flex-end

.v-card--reveal
  position absolute
  top 0
  align-items center
  justify-content center
  width 100%
  height 100%
  background-color #000 !important
  border-radius 100px
  color #fff
  opacity .8

.them-toggle
  box-shadow none !important
  .v-btn
    width 50px !important
    height 50px !important
    margin 0 5px
  .v-btn--floating
    border-radius: 50% !important

.font-toggle
  box-shadow none !important
  .v-btn
    height 60px
    margin 0 10px
  
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
