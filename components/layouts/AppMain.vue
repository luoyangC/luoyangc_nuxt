/*
 * @Author: luoyang
 * @Date: 2019-08-10 13:48:44
 * @Last Modified by: luoyang
 * @Last Modified time: 2019-08-24 12:32:25
 */
<template>
  <v-content>
    <nuxt />
    <live-card v-if="$route.path != '/'" />
    <v-btn fixed bottom right fab :style="{'opacity':opacityUp}" color="rgba(255,255,255,.2)" @click="arrowUp">
      <v-icon>arrow_upward</v-icon>
    </v-btn>
  </v-content>
</template>

<script>
import { mapGetters } from 'vuex'
import LiveCard from '@/components/live-card'
export default {
  name: 'AppMain',
  components: {
    LiveCard
  },
  props: {
    currentPage: { // 当前页面路径
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters('app', [
      'offsetTop'
    ]),
    opacityUp() { // 计算是否显示回到顶部按钮
      if (this.offsetTop < 1000) {
        return 0
      } else {
        return (this.offsetTop - 1000) / 200
      }
    }
  },
  methods: {
    // 回到顶部
    arrowUp() {
      this.$vuetify.goTo(0, { duration: 500, offset: 0, easing: 'easeInOutCubic' })
    }
  }
}
</script>
