/*
 * @Author: luoyang 
 * @Date: 2019-08-10 14:19:06 
 * @Last Modified by: luoyang
 * @Last Modified time: 2019-08-10 19:11:26
 */
<template>
  <v-navigation-drawer :clipped="clipped" :value="drawer" temporary app @input="navigation">

    <navbar-toolbar @default="setArticleParams" />

    <navbar-avatar />

    <navbar-search @search="setArticleParams" />

    <!-- <navbar-option /> -->

    <navbar-list />

  </v-navigation-drawer>
</template>

<script>
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
      if (type == 'category') {
        data = {category: params}
      } else if (type == 'time') {
        data = {time: moment(params).format('YYYY-MM')}
      } else if (type == 'search') {
        data = {search: params}
        this.search = ''
      } else if (type == 'default') {
        data = {}
      }
      this.drawer = false
      this.$store.commit('setArticleParams', data)
      this.$router.push('/inspire')
    },
  }
}
</script>