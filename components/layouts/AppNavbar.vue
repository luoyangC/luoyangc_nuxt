/*
 * @Author: luoyang
 * @Date: 2019-08-10 14:19:06
 * @Last Modified by: luoyang
 * @Last Modified time: 2019-08-26 23:14:35
 */
<template>
  <v-navigation-drawer :clipped="clipped" :value="drawer" temporary app @input="navigation">
    <!-- 侧栏顶栏 -->
    <navbar-toolbar @default="setArticleParams" />
    <!-- 侧栏头像 -->
    <navbar-avatar />
    <!-- 侧栏搜索 -->
    <navbar-search @search="setArticleParams" />
    <!-- 侧栏工具 -->
    <navbar-option />
    <!-- 侧栏导航 -->
    <navbar-list @params="setArticleParams" />
  </v-navigation-drawer>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import NavbarToolbar from './NavbarToolbar'
import NavbarAvatar from './NavbarAvatar'
import NavbarSearch from './NavbarSearch'
import NavbarOption from './NavbarOption'
import NavbarList from './NavbarList'
export default {
  components: {
    NavbarToolbar,
    NavbarAvatar,
    NavbarSearch,
    NavbarOption,
    NavbarList
  },
  data: () => ({
    search: ''
  }),
  computed: {
    ...mapGetters('app', [
      'drawer',
      'clipped'
    ])
  },
  methods: {
    navigation(e) {
      if (!e) {
        this.$store.dispatch('app/setDrawer', false)
      }
    },
    // 设置文章的过滤参数
    setArticleParams(type, params) {
      let data
      if (type === 'category') {
        data = { category: params }
      } else if (type === 'time') {
        data = { time: moment(params).format('YYYY-MM') }
      } else if (type === 'search') {
        data = { search: params }
        this.search = ''
      } else if (type === 'default') {
        data = {}
      }
      this.$store.dispatch('app/setDrawer', false)
      this.$store.dispatch('article/setArticleParams', data)
      this.$router.push('/inspire')
    }
  }
}
</script>

<style lang="stylus">
.v-navigation-drawer
  transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important
</style>
