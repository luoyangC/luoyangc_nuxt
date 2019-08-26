<template>
  <v-layout column>

    <jumbotron-card :height="parallaxHeight" title="记录" lines="最后编辑于 2018 年 08 月 23 日" :image="currentImage" />

    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6 xl6 ml-3 mr-2>
        <v-timeline align-top :dense="dense">
          <v-timeline-item v-for="profile in profiles" :key="profile.id" color="#0d395f" fill-dot large>
            <div slot="icon" class="profileDot">{{ profile.time }}</div>
            <v-card nuxt :to="'/content/' + profile.id">
              <v-card-title class="title"><a :href="'/content/' + profile.id">{{ profile.title }}</a></v-card-title>
              <v-card-text class="text--primary">{{ profile.profile }}</v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-flex>
    </v-layout>

    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6 xl6>
        <v-layout justify-space-between>
          <v-btn round outline nuxt to="/inspire">文章</v-btn>
          <v-spacer />
          <v-btn round outline nuxt to="/message">留言</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>

  </v-layout>
</template>

<script>
import JumbotronCard from '@/components/jumbotron-card'
import moment from 'moment'

export default {
  components: {
    JumbotronCard
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

  async asyncData({ app, $axios }) {
    const imageId = app.store.getters.cartRandomImage[1] || 100
    const { data } = await $axios.get(`/profile/`)
    data.forEach(element => {
      element.time = moment(element.update_time).format('MMM DD YYYY')
    })
    return {
      profiles: data,
      currentImage: `https://luoyangc.oss-cn-shanghai.aliyuncs.com/media/image/random/${imageId}.png`
    }
  }
}
</script>

<style lang="stylus" scoped>
.profileDot
  width 100%
  height 100%
  color #fff
  text-align center
  font-size 16px
  background-color #0d395f
  box-shadow 0 4px 15px 0 rgba(0,0,0,.75)
</style>
