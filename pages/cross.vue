<template>
  <v-layout column>
    
    <jumbotron-card :height="parallaxHeight" title="动态" lines="最后编辑于 2018 年 08 月 23 日" image="https://luoyangc.oss-cn-shanghai.aliyuncs.com/media/image/random/ims%20%2886%29.png"/>

    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6 xl6>
        <v-timeline dense align-top>
          <v-timeline-item v-for="dynamic in dynamics" :key="dynamic.id" small>
            <div class="py-3">
              <h2 class="headline font-weight-light mb-3" v-text="dynamic.create_time"></h2>
              <div>{{dynamic.content}}</div>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-flex>
    </v-layout>

  </v-layout>
</template>

<script>
import JumbotronCard from '@/components/jumbotron-card'
import { getDynamics } from "@/api"

export default {
  components: {
    JumbotronCard
  },
  async asyncData() {
    let { data } = await getDynamics()
    return {
      dynamics: data,
    }
  },
  computed: {
    windowSize() {
      return this.$store.state.windowSize
    },
    parallaxHeight() {
      return (this.windowSize.x + this.windowSize.y) / 4
    }
  },
}
</script>

<style lang="stylus" scoped>  
</style>
