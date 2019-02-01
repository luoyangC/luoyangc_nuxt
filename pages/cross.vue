<template>
  <v-layout column>
    
    <jumbotron-card :height="parallaxHeight" title="动态" lines="最后编辑于 2018 年 08 月 23 日" :image="currentImage"/>

    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6 xl6>
        <v-timeline dense align-top>
          <v-timeline-item v-for="dynamic in dynamics" :key="dynamic.id" small>
            <v-layout column>
              <h1 class="headline font-weight-light mb-3" v-text="dynamic.create_time"></h1>
              <p>{{dynamic.content}}</p>
            </v-layout>
          </v-timeline-item>
        </v-timeline>
      </v-flex>
    </v-layout>

    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6 xl6>
        <v-layout justify-space-between>
          <v-btn round outline nuxt to="/message">留言</v-btn>
          <v-spacer/>
          <v-btn round outline nuxt to="/about">关于</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>

  </v-layout>
</template>

<script>
import JumbotronCard from '@/components/jumbotron-card'
export default {
  components: {
    JumbotronCard
  },

  async asyncData({app, $axios}) {
    let imageId = app.store.getters.cartRandomImage[3] || 100
    let { data } = await $axios.get(`/dynamics/`)
    return {
      dynamics: data,
      currentImage: `https://luoyangc.oss-cn-shanghai.aliyuncs.com/media/image/random/ims%20%28${imageId}%29.png`,
    }
  },

  computed: {
    windowSize() {
      return this.$store.state.windowSize
    },
    parallaxHeight() {
      return (this.windowSize.x + this.windowSize.y) / 4
    },
  },

}
</script>
