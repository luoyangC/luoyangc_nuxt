/*
 * @Author: luoyang
 * @Date: 2019-08-26 23:29:46
 * @Last Modified by: luoyang
 * @Last Modified time: 2019-08-26 23:33:04
 */
<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6 xl6>
      <v-layout justify-space-between>
        <v-btn round outline nuxt :to="prev">{{ prevName }}</v-btn>
        <v-spacer />
        <v-btn round outline nuxt :to="next">{{ nextName }}</v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'PageBottom',
  props: {
    prev: {
      type: String,
      default: ''
    },
    next: {
      type: String,
      default: ''
    },
    prevName: {
      type: String,
      default: ''
    },
    nextName: {
      type: String,
      default: ''
    }
  }
}
</script>
