<template>
  <v-layout column>

    <jumbotron-card :height="parallaxHeight" :title="article.title" :lines="`2018 年 03 月 17 日 • 阅读数: 99`" :image="article.image_url"/>

    <v-layout wrap justify-center>
      <v-flex xs12 sm10 md8 lg6 xl6 mb-5 mt-2 ml-2 mr-2>
        <v-card flat>
          <v-card-title>
            <span>标签: </span>
            <v-chip small label>Python</v-chip>
            <v-chip small label>Django</v-chip>
            <v-chip small label>WebSocket</v-chip>
          </v-card-title>
          <v-card-text v-html="content" class="markdown-content"></v-card-text>
          <v-card-actions>
            <v-layout justify-space-between>
              <v-btn round outline>返回文章列表</v-btn>
              <v-btn round outline>返回文章首页</v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

  </v-layout>
</template>

<script>
import JumbotronCard from '@/components/jumbotron-card'
import { getArticleInfo } from "@/api"
import { md } from "@/plugins/markdown-it"

export default {
  components: {
    JumbotronCard,
  },
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData({ params }) {
    let { data } = await getArticleInfo(params.id)
    let result = md.render(data.content)
    return {
      id: params.id,
      article: data,
      content: result,
      toolbars:{readmodel: true},
    };
  },
  computed: {
    windowSize() {
      return this.$store.state.windowSize
    },
    parallaxHeight() {
      return (this.windowSize.x + this.windowSize.y) / 4
    },
  }
};
</script>

<style lang="stylus">
.title-text
  -webkit-font-smoothing antialiased
  font-family 'Telefon Black', Sans-Serif
  font-size 36px
  font-weight 600
  color white
  -webkit-text-stroke 2px black
.markdown-content
  font-size: 100%
  line-height: 1.5
  img
    width auto
    height auto
    max-width 100%
    max-height 100%
</style>

