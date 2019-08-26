<template>
  <v-layout column>

    <jumbotron-card :height="parallaxHeight" title="动态" lines="最后编辑于 2018 年 08 月 23 日" :image="currentImage" />

    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6 xl6>
        <v-timeline dense align-top>
          <v-timeline-item v-for="dynamic in dynamics" :key="dynamic.id" small>
            <v-layout column>
              <h1 class="headline font-weight-light mb-3" v-text="dynamic.time" />
              <p>{{ dynamic.content }}</p>
            </v-layout>
          </v-timeline-item>
        </v-timeline>
      </v-flex>
    </v-layout>

    <page-bottom prev="/message" next="/about" prev-name="留言" next-name="关于" />

  </v-layout>
</template>

<script>
import JumbotronCard from '@/components/jumbotron-card'
import PageBottom from '@/components/PageBottom'
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  components: {
    JumbotronCard,
    PageBottom
  },
  computed: {
    ...mapGetters('app', [
      'parallaxHeight'
    ])
  },
  async asyncData({ app, $axios }) {
    const imageId = app.store.getters['app/randomImage'][3] || 100
    const { data } = await $axios.get(`/dynamics/`)
    data.forEach(element => {
      element.time = moment(element.create_time).format('YYYY年MM月DD日')
    })
    return {
      dynamics: data,
      currentImage: `https://luoyangc.oss-cn-shanghai.aliyuncs.com/media/image/random/${imageId}.png`
    }
  }

}
</script>
