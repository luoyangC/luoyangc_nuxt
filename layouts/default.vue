<template>
  <v-app :dark="dark" v-scroll="onScroll" v-resize="onResize" :style="`font-size: ${fontSize}px`">

    <v-navigation-drawer :clipped="clipped" v-model="drawer" width="350" temporary app @input="navigation">

      <v-layout mt-3>
        <v-btn absolute left fab flat nuxt to="/inspire" active-class="active-disabled">
          <v-icon>home</v-icon>
        </v-btn>
        <v-btn absolute right fab flat @click="drawer = !drawer">
          <v-icon>clear_all</v-icon>
        </v-btn>
      </v-layout>

      <v-layout justify-center mt-5 mb-2>
        <v-hover>
          <v-avatar slot-scope="{ hover }" size="100" color="grey lighten-4">
            <img src="images/user/icon-a.png" alt="avatar">
            <v-expand-transition>
              <v-card v-if="hover" class="transition-fast-in-fast-out v-card--reveal" ripple nuxt to="/login">
                <v-icon large dark>fingerprint</v-icon>
              </v-card>
            </v-expand-transition>
          </v-avatar>
        </v-hover>
      </v-layout>

      <v-layout pl-3 pr-3>
        <v-text-field label="search" append-icon="search"></v-text-field>
      </v-layout>

      <v-layout class="nav-footer" justify-center>
        <v-btn fab flat @click="dark = !dark; fontSlider = false; musicFrame = false">
          <v-icon>brightness_medium</v-icon>
        </v-btn>
        <v-btn fab flat @click="fontSlider = !fontSlider; musicFrame = false">
          <v-icon>font_download</v-icon>
        </v-btn>
        <v-btn fab flat @click="musicFrame = !musicFrame; fontSlider = false">
          <v-icon>queue_music</v-icon>
        </v-btn>
      </v-layout>

      <v-layout justify-center>
        <v-expand-transition>
          <v-card flat class="transition-fast-in-fast-out font-slider" v-show="fontSlider" height="110" width="320" color="rgba(0,0,0,0)">
            <v-slider v-model="fontSize" label="字体大小" thumb-label="always" thumb-size="24" min="10" max="30"></v-slider>
          </v-card>
        </v-expand-transition>
      </v-layout>

      <v-layout justify-center>
        <v-expand-transition>
          <!-- <iframe class="transition-fast-in-fast-out" v-show="musicFrame" frameborder="no" border="0" marginwidth="0" marginheight="0" width=320 height=110 src="//music.163.com/outchain/player?type=0&id=2437500377&auto=0&height=90"></iframe> -->
        </v-expand-transition>
      </v-layout>

      <v-list style="background-color:rgba(0,0,0,0)">

        <v-list-group prepend-icon="bookmarks">
          <v-list-tile slot="activator">
            <v-list-tile-title class="text-xs-center">归档</v-list-tile-title>
          </v-list-tile>

          <v-list-tile v-for="(item, i) in archives"  :key="i" router exact @click="drawer = !drawer">
            <v-list-tile-content>
              <v-list-tile-title class="text-xs-center" v-text="item"/>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <v-list-group prepend-icon="ballot">
          <v-list-tile slot="activator">
            <v-list-tile-title class="text-xs-center">分类</v-list-tile-title>
          </v-list-tile>

          <v-list-tile v-for="(item, i) in categories" :to="item.to" :key="i" router exact @click="drawer = !drawer">
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
      <v-toolbar-side-icon @click="drawer = !drawer"/>
    </v-toolbar>

    <v-content>
      <nuxt/>

      <v-btn fixed bottom right fab @click="arrowUp" :style="{'opacity':opacityUp}" color="rgba(255,255,255,.2)">
        <v-icon>arrow_upward</v-icon>
      </v-btn>
      
    </v-content>

    <v-footer color="rgba(0,0,0,0)" height="100">
      <v-layout column justify-center align-center>
        <v-layout>&copy; 2019</v-layout>
        <v-layout justify-center align-center >
          <v-img height="20" width="20" src="icons/beiantubiao.png"/>
          <a href="http://www.miitbeian.gov.cn" rel="external nofollow">&nbsp;渝 ICP 备 18014351 号&nbsp;</a>
        </v-layout>
      </v-layout>
    </v-footer>

  </v-app>
</template>

<script>
import moment from 'moment'
import { getCategory, getArchives } from '@/api'

export default {
  data() {
    return {
      musicFrame: false,
      fontSlider: false,
      fontSize: 16,
      offsetTop: 0,
      clipped: false,
      drawer: false,
      dark: false,
      pages: [
        { icon: "event_note", title: "记录", to: "/archives" },
        { icon: "chat", title: "留言", to: "/message" },
        { icon: "create", title: "动态", to: "/cross" },
        { icon: "recent_actors", title: "关于", to: "/about" },
      ],
      archives: [
      ],
      categories: [
        { title: "python" },
        { title: "java" },
        { title: "vue" },
        { title: "算法" },
      ],
      title: "Amor的博客"
    };
  },
  methods: {
    navigation(e) {
      if (!e) {
        this.fontSlider = false
        this.musicFrame = false
      }
    },
    autoDark() {
      let now = new Date
      let hours = now.getHours()
      if (6 <= hours <= 18) {
        this.dark = false
      } else {
        this.dark = true
      }
    },
    arrowUp() {
      this.$vuetify.goTo(0, {duration: 500, offset: 0, easing: 'easeInOutCubic'})
    },
    onScroll(e) {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
    },
    onResize() {
      this.$store.commit('setWindowSize', { x: window.innerWidth, y: window.innerHeight })
    },
    timeFormat (time) {
      return moment(time).format('MMM DD YYYY')
    },
    async getData() {
      // 获取分类数据
      let categories = await getCategory()
      this.categories = categories.data
      // 获取归档数据
      let archives = await getArchives()
      archives.data.forEach(element => {
        this.archives.push(moment(element.archive).format('MMM DD YYYY'))
      })
    }
  },
  computed: {
    opacityUp() {
      if (this.offsetTop < 1000) {
        return 0
      } else {
        return (this.offsetTop - 1000) / 200
      }
    },
    windowSize() {
      return this.$store.state.windowSize
    },
    outParallax() {
      let height = (this.windowSize.x + this.windowSize.y) / 4
      if (this.offsetTop <= height) {
        return 'dark'
      }
    },
  },
  created() {
    this.autoDark()
    this.getData()
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
</style>

