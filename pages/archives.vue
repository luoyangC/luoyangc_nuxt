<template>
  <v-layout column>

    <jumbotron-card :height="parallaxHeight" title="记录" lines="最后编辑于 2018 年 08 月 23 日" image="https://luoyangc.oss-cn-shanghai.aliyuncs.com/media/image/random/ims%20%2889%29.png"/>

    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6 xl6 ml-3 mr-2>
        <v-timeline align-top :dense="dense">
          <v-timeline-item v-for="profile in profiles" :key="profile.id" color="#0d395f" fill-dot large>
            <div slot="icon" class="profileDot">Doc 18 2018</div>
            <v-card nuxt :to="'/content/' + profile.id">
              <v-card-title class="title">{{profile.title}}</v-card-title>
              <v-card-text class="text--primary">{{profile.profile}}</v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-flex>
    </v-layout>

  </v-layout>
</template>

<script>
import JumbotronCard from '@/components/jumbotron-card'
import { getProfile } from '@/api'

export default {
  components: {
    JumbotronCard
  },
  async asyncData() {
    let { data }= await getProfile()
    return {
      profiles: data,
    }
  },
  computed: {
    windowSize() {
      return this.$store.state.windowSize
    },
    parallaxHeight() {
      return (this.windowSize.x + this.windowSize.y) / 4
    },
    dense() {
      if (this.windowSize.x <= 960) return true
      else return false
    }
  },
}
</script>

<style lang="stylus" scoped>
.profileDot
  width 100%
  height 100%
  color #fff
  text-align center
  background-color #0d395f
  box-shadow 0 4px 15px 0 rgba(0,0,0,.75)
</style>