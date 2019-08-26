/*
 * @Author: luoyang
 * @Date: 2019-08-10 16:56:18
 * @Last Modified by: luoyang
 * @Last Modified time: 2019-08-26 23:15:01
 */
<template>
  <v-list style="background-color:rgba(0,0,0,0)">
    <v-list-group prepend-icon="bookmarks">
      <v-list-tile slot="activator">
        <v-list-tile-title class="text-xs-center">归档</v-list-tile-title>
      </v-list-tile>

      <v-list-tile v-for="(item, i) in archives" :key="i" router exact @click="handleParams('time', item)">
        <v-list-tile-content>
          <v-list-tile-title class="text-xs-center" v-text="item" />
        </v-list-tile-content>
      </v-list-tile>
    </v-list-group>

    <v-list-group prepend-icon="ballot">
      <v-list-tile slot="activator">
        <v-list-tile-title class="text-xs-center">分类</v-list-tile-title>
      </v-list-tile>

      <v-list-tile v-for="(item, i) in categories" :key="i" :to="item.to" router exact @click="handleParams('category', item.id)">
        <v-list-tile-content>
          <v-list-tile-title class="text-xs-center" v-text="item.title" />
        </v-list-tile-content>
      </v-list-tile>
    </v-list-group>

    <v-list-tile v-for="(item, i) in pages" :key="i" :to="item.to" router exact>
      <v-list-tile-action>
        <v-icon v-html="item.icon" />
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title class="text-xs-center" v-text="item.title" />
      </v-list-tile-content>
      <v-list-tile-action />
    </v-list-tile>
  </v-list>
</template>

<script>
import moment from 'moment'
export default {
  name: 'NavbarList',
  data: () => ({
    categories: [],
    archives: [],
    pages: [
      { icon: 'event_note', title: '记录', to: '/archives' },
      { icon: 'chat', title: '留言', to: '/message' },
      { icon: 'create', title: '动态', to: '/cross' },
      { icon: 'recent_actors', title: '关于', to: '/about' }
    ]
  }),
  created() {
    this.getData()
  },
  methods: {
    handleParams(type, data) {
      this.$emit('params', type, data)
    },
    // 获取接口数据
    async getData() {
      // 获取分类数据
      const { data: categories } = await this.$axios.get(`/category/`)
      this.categories = categories
      // 获取归档数据
      const { data: archives } = await this.$axios.get(`/archive/`)
      archives.forEach(element => {
        this.archives.push(moment(element.archive).format('MMM DD YYYY'))
      })
    }
  }
}
</script>
