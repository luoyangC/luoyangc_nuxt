/*
 * @Author: luoyang 
 * @Date: 2019-08-10 16:58:36 
 * @Last Modified by: luoyang
 * @Last Modified time: 2019-08-10 19:10:42
 */
<template>
  <v-layout mt-3>
      <v-btn absolute left fab flat active-class="active-disabled" @click="handleHome">
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn absolute right fab flat @click="handleClose">
        <v-icon>clear_all</v-icon>
      </v-btn>
    </v-layout>
</template>

<script>
export default {
  name: 'NavbarToolbar',
  methods: {
    handleClose() {
      this.$store.dispatch('app/setDrawer', false)
    },
    handleHome() {
      this.$emit('default', 'default')
    }
  }
}
</script>