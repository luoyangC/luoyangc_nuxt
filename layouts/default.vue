<template>
  <v-app :dark="dark" v-scroll="onScroll" v-resize="onResize" :style="`font-size: ${fontSize}px`" :class="currentFont+' '+currentThem">

    <v-navigation-drawer :clipped="clipped" v-model="drawer" temporary app @input="navigation">

      <v-layout mt-3>
        <v-btn absolute left fab flat active-class="active-disabled" @click="setArticleParams('default')">
          <v-icon>home</v-icon>
        </v-btn>
        <v-btn absolute right fab flat @click="drawer = !drawer">
          <v-icon>clear_all</v-icon>
        </v-btn>
      </v-layout>

      <v-layout justify-center mt-5 mb-2>
        <v-hover v-if="currentUser.id">
          <v-avatar slot-scope="{ hover }" size="80" color="grey lighten-4">
            <img :src="currentUser.image" alt="avatar">
            <v-expand-transition>
              <v-card v-if="hover" class="transition-fast-in-fast-out v-card--reveal" ripple nuxt to="/user">
                <v-icon large dark>touch_app</v-icon>
              </v-card>
            </v-expand-transition>
          </v-avatar>
        </v-hover>

        <v-hover v-else>
          <v-avatar slot-scope="{ hover }" size="80" color="grey lighten-4">
            <img src="/icons/xigua.png" alt="avatar">
            <v-expand-transition>
              <v-card v-if="hover" class="transition-fast-in-fast-out v-card--reveal" ripple nuxt to="/login">
                <v-icon large dark>fingerprint</v-icon>
              </v-card>
            </v-expand-transition>
          </v-avatar>
        </v-hover>
      </v-layout>

      <v-layout pl-3 pr-3>
        <v-text-field label="search" v-model="search" append-icon="search" @keydown.enter="setArticleParams('search')"></v-text-field>
      </v-layout>

      <v-layout class="nav-footer" justify-center>
        <v-btn fab flat @click="themSelect = !themSelect; fontSlider = false; fontSelect = false; musicFrame = false" title="背景主题">
          <v-icon>format_paint</v-icon>
        </v-btn>
        <v-btn fab flat @click="fontSlider = !fontSlider; themSelect = false; fontSelect = false; musicFrame = false" title="字体大小">
          <v-icon>text_fields</v-icon>
        </v-btn>
        <v-btn fab flat @click="fontSelect = !fontSelect; themSelect = false; fontSlider = false; musicFrame = false" title="字体样式">
          <v-icon>font_download</v-icon>
        </v-btn>
        <!-- <v-btn fab flat @click="musicFrame = !musicFrame; themSelect = false; fontSlider = false; fontSelect = false" title="背景音乐">
          <v-icon>queue_music</v-icon>
        </v-btn> -->
      </v-layout>

      <v-layout justify-center>
        <v-expand-transition>
          <v-card flat class="transition-fast-in-fast-out" v-show="themSelect" height="110" width="320" color="rgba(0,0,0,0)">
            <v-layout fill-height justify-center align-center>
              <v-btn-toggle v-model="themas" mandatory class="them-toggle">
                <v-btn fab flat title="自动">
                  <v-icon>brightness_auto</v-icon>
                </v-btn>
                <v-btn fab flat title="纯白">
                  <v-icon>brightness_low</v-icon>
                </v-btn>
                <v-btn fab flat title="夜间">
                  <v-icon>brightness_medium</v-icon>
                </v-btn>
                <v-btn fab flat title="碎花">
                  <v-icon>brightness_high</v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-layout>
          </v-card>
        </v-expand-transition>
      </v-layout>

      <v-layout justify-center>
        <v-expand-transition>
          <v-card flat class="transition-fast-in-fast-out font-slider" v-show="fontSlider" height="110" width="240" color="rgba(0,0,0,0)">
            <v-slider v-model="fontSize" thumb-label="always" thumb-size="24" min="10" max="30"></v-slider>
          </v-card>
        </v-expand-transition>
      </v-layout>

      <v-layout justify-center>
        <v-expand-transition>
          <v-card flat class="transition-fast-in-fast-out" v-show="fontSelect" height="110" width="320" color="rgba(0,0,0,0)">
            <v-layout fill-height justify-center align-center>
              <v-btn-toggle v-model="fontFamily" mandatory class="font-toggle">
                <v-btn flat>
                  <v-layout column justify-center align-center>
                    <div style="font-size: 25px" class="font-default">Ag</div>
                    <div style="font-size: 12px; line-height: 1.35; margin-top: 4px;" class="font-default">默认</div>
                  </v-layout>
                </v-btn>
                <v-btn flat>
                  <v-layout column justify-center align-center>
                    <div style="font-size: 25px" class="font-Serif">Ag</div>
                    <div style="font-size: 12px; line-height: 1.35; margin-top: 4px;" class="font-Serif">衬线</div>
                  </v-layout>
                </v-btn>
                <v-btn flat>
                  <v-layout column justify-center align-center>
                  <div style="font-size: 25px" class="font-mono">Ag</div>
                  <div style="font-size: 12px; line-height: 1.35; margin-top: 4px;" class="font-mono">等宽</div>
                  </v-layout>
                </v-btn>
              </v-btn-toggle>
            </v-layout>
          </v-card>
        </v-expand-transition>
      </v-layout>

      <!-- <v-layout justify-center>
        <v-expand-transition>
          <v-card flat class="transition-fast-in-fast-out font-slider" v-show="musicFrame" height="110" width="320" color="rgba(0,0,0,0)">
            <iframe class="transition-fast-in-fast-out" v-show="musicFrame" frameborder="no" border="0" marginwidth="0" marginheight="0" width=320 height=110 src="//music.163.com/outchain/player?type=0&id=2437500377&auto=0&height=90"></iframe>
          </v-card>
        </v-expand-transition>
      </v-layout> -->

      <v-list style="background-color:rgba(0,0,0,0)">

        <v-list-group prepend-icon="bookmarks">
          <v-list-tile slot="activator">
            <v-list-tile-title class="text-xs-center">归档</v-list-tile-title>
          </v-list-tile>

          <v-list-tile v-for="(item, i) in archives"  :key="i" router exact @click="setArticleParams('time', item)">
            <v-list-tile-content>
              <v-list-tile-title class="text-xs-center" v-text="item"/>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <v-list-group prepend-icon="ballot">
          <v-list-tile slot="activator">
            <v-list-tile-title class="text-xs-center">分类</v-list-tile-title>
          </v-list-tile>

          <v-list-tile v-for="(item, i) in categories" :to="item.to" :key="i" router exact @click="setArticleParams('category', item.id)">
            <v-list-tile-content>
              <v-list-tile-title class="text-xs-center" v-text="item.title"/>
            </v-list-tile-content>
          </v-list-tile>

        </v-list-group>

        <v-list-tile v-for="(item, i) in pages" :to="item.to" :key="i" router exact>
          <v-list-tile-action>
            <v-icon v-html="item.icon"/>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="text-xs-center" v-text="item.title"/>
          </v-list-tile-content>
          <v-list-tile-action></v-list-tile-action>
        </v-list-tile>

      </v-list>

    </v-navigation-drawer>

    <v-toolbar color="rgba(0,0,0,0)" :clipped-left="clipped" :dark="outParallax" flat fixed>
      <v-toolbar-side-icon @click="drawer = !drawer" :style="{ color: currentPage == '/' ? '#000' : '' }"/>
    </v-toolbar>

    <v-content>
      <nuxt/>

      <live-card v-if="currentPage != '/'"></live-card>

      <v-btn fixed bottom right fab @click="arrowUp" :style="{'opacity':opacityUp}" color="rgba(255,255,255,.2)">
        <v-icon>arrow_upward</v-icon>
      </v-btn>
      
    </v-content>

    <v-footer color="rgba(0,0,0,0)" height="80" style="font-size:12px">
      <v-layout column justify-center align-center>
        <v-layout>&copy; 2019</v-layout>
        <v-layout justify-center align-center >
          <v-img height="18" width="18" src="/icons/beiantubiao.ico"/>
          <a href="http://www.miitbeian.gov.cn" rel="external nofollow">&nbsp;渝 ICP 备 18014351 号&nbsp;</a>
        </v-layout>
      </v-layout>
    </v-footer>

  </v-app>
</template>

<script>
import LiveCard from '@/components/live-card'
import moment from 'moment'

export default {
  components: {
    LiveCard,
  },
  data() {
    return {
      search: '',
      title: "Amor的博客",
      themSelect: false,
      fontSlider: false,
      fontSelect: false,
      musicFrame: false,
      themas: 0,
      fontFamily: 0,
      fontSize: 16,
      clipped: false,
      drawer: false,
      dark: false,
      offsetTop: 0,
      archives: [],
      categories: [],
      pages: [
        { icon: "event_note", title: "记录", to: "/archives" },
        { icon: "chat", title: "留言", to: "/message" },
        { icon: "create", title: "动态", to: "/cross" },
        { icon: "recent_actors", title: "关于", to: "/about" },
      ],
    };
  },
  methods: {
    // 侧边栏变化时回调函数
    navigation(e) {
      if (!e) {
        this.themSelect = false
        this.fontSlider = false
        this.musicFrame = false
        this.fontSelect = false
      }
    },
    // 根据时间自动切换夜间模式
    autoDark() {
      let now = new Date
      let hours = now.getHours()
      if (hours <= 6 || hours <= 18) {
        return false
      } else {
        return true
      }
    },
    // 回到顶部
    arrowUp() {
      this.$vuetify.goTo(0, {duration: 500, offset: 0, easing: 'easeInOutCubic'})
    },
    // 页面滚动时回调函数
    onScroll(e) {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
    },
    // 时间处理函数
    timeFormat(time) {
      return moment(time).format('MMM DD YYYY')
    },
    // 窗口改变时回调函数
    onResize() {
      this.$store.commit('setWindowSize', { x: window.innerWidth, y: window.innerHeight })
    },
    // 初始化字体大小
    setFontSize() {
      let w = this.windowSize.x
      if (w <= 600) this.fontSize = 12
      else if (w > 600 && w <= 960) this.fontSize = 14
      else this.fontSize = 16
    },
    // 随机生成顶部图片
    randomImage() {
      let randomImage = []
      for (let index = 0; index < 10; index++) {
        randomImage.push(Math.floor(Math.random() * 200))
      }
      this.$store.commit('setRandomImage', randomImage)
    },
    // 设置文章的过滤参数
    setArticleParams(type, params) {
      let data
      if (type == 'category') {
        data = {category: params}
      } else if (type == 'time') {
        data = {time: moment(params).format('YYYY-MM')}
      } else if (type == 'search') {
        data = {search: this.search}
        this.search = ''
      } else if (type == 'default') {
        data = {}
      }
      this.drawer = false
      this.$store.commit('setArticleParams', data)
      this.$router.push('/inspire')
    },
    // 获取接口数据
    async getData() {
      // 获取分类数据
      let categories = await this.$axios.get(`/category/`)
      this.categories = categories.data
      // 获取归档数据
      let archives = await this.$axios.get(`/archive/`)
      archives.data.forEach(element => {
        this.archives.push(moment(element.archive).format('MMM DD YYYY'))
      })
      // 获取用户信息
      let user = await this.$axios.get(`/user/`)
      this.$store.commit('setCurrentUser', user.data)
    }
  },
  computed: {
    // 是否为首页
    currentPage() {
      return this.$route.path
    },
    // 计算回到顶部按钮是否显示
    opacityUp() {
      if (this.offsetTop < 1000) {
        return 0
      } else {
        return (this.offsetTop - 1000) / 200
      }
    },
    // 计算窗口尺寸
    windowSize() {
      return this.$store.state.windowSize
    },
    // 计算滚动高度是否低于顶部图片高度
    outParallax() {
      let height = (this.windowSize.x + this.windowSize.y) / 4
      if (this.offsetTop < height - 10) {
        return true
      }
    },
    // 计算当前的登录用户
    currentUser() {
      return this.$store.getters.cartCurrentUser
    },
    // 计算当前字体
    currentFont() {
      if (this.fontFamily == 0) return 'font-default'
      if (this.fontFamily == 1) return 'font-Serif'
      if (this.fontFamily == 2) return 'font-mono'
    },
    currentThem() {
      if (this.themas == 0) {
        this.dark = this.autoDark()
      }
      if (this.themas == 1) {
        this.dark = false
        return 'them-default'
      }
      if (this.themas == 2) {
        this.dark = true
        return 'them-medium'
      }
      if (this.themas == 3) {
        this.dark = false
        return 'them-height'
      }
    }
  },
  created() {
    this.randomImage()
    this.getData()
  },
  mounted() {
    this.onResize()
    this.setFontSize()
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
