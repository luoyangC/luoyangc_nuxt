<template>
  <v-layout column>

    <jumbotron-card :height="parallaxHeight" title="Luoyang's Blog" lines="深林人不知，明月来相照" image="https://luoyangc.oss-cn-shanghai.aliyuncs.com/media/image/random/ims%20%2890%29.png"/>

    <v-layout wrap justify-center>
      <v-flex xs12 sm10 md8 lg6 xl6 v-for="article in articles" :key="article.id" mb-5 mt-2 ml-2 mr-2>
        <article-card :article="article" :articleHeight="articleHeight"></article-card>
      </v-flex>
    </v-layout>

    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6 xl6>
        <v-layout justify-space-between>
          <v-btn round outline v-show="prev" @click="changePage(prev)">上一页</v-btn>
          <v-spacer/>
          <v-btn round outline v-show="next" @click="changePage(next)">下一页</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>

  </v-layout>
</template>

<script>
import ArticleCard from '@/components/article-card'
import JumbotronCard from '@/components/jumbotron-card'
import { getArticle } from '@/api'

export default {

  components: { ArticleCard, JumbotronCard },

  async asyncData({app}) {
    let {data} = await getArticle()
    return {
      next: data.next,
      prev: data.previous,
      articles: data.results
    }
  },

  methods: {
    async changePage(page) {
      this.$vuetify.goTo(0, {duration: 500, offset: this.parallaxHeight, easing: 'easeInOutCubic'})
      let data = await this.$axios.get(`https${page.slice(4)}`)
      this.next = data.next
      this.prev = data.previous
      this.articles = data.results
    }
  },

  computed: {
    windowSize() {
      return this.$store.state.windowSize
    },
    parallaxHeight() {
      return (this.windowSize.x + this.windowSize.y) / 4
    },
    articleHeight() {
      if (this.windowSize.x < 960) return 200
      else return 250
    },
  },

};
</script>

<style lang="stylus" scoped>
</style>
