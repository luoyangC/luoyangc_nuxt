/*
 * @Author: luoyang
 * @Date: 2019-08-10 14:35:15
 * @Last Modified by: luoyang
 * @Last Modified time: 2019-08-26 23:13:44
 */
<template>
  <v-layout pl-3 pr-3>
    <v-text-field v-model="search" label="输入关键词搜索" append-icon="search" @keydown.enter="handleSearch" />
  </v-layout>
</template>

<script>
export default {
  name: 'NavbarSearch',
  data: () => ({
    search: ''
  }),
  methods: {
    handleSearch() {
      this.$emit('search', 'search', this.search)
      this.search = ''
    }
  }
}
</script>
