<template>
  <v-layout column>

    <jumbotron-card :height="parallaxHeight" :title="article.title" :lines="`${articleTime} • 阅读数: ${article.view_nums}`" :image="article.image"/>

    <v-layout wrap justify-center>

      <v-flex xs12 sm10 md8 lg6 xl6 mb-5 mt-2 ml-2 mr-2>

        <V-layout class="auth-avatar" :style="{'font-size':smallSize}">{{emojis[0]}}</V-layout>

        <v-card flat>

          <v-card-text v-html="content" class="markdown-content"></v-card-text>

          <v-card-title>
            <span>标签: </span>
            <v-chip small v-for="(tag, index) in tags" :key="index" @click="setArticleParams('tag', tag)" class="chip">{{tag}}</v-chip>
          </v-card-title>

          <v-layout pl-3 pr-3 pb-3>
            <v-divider></v-divider>
          </v-layout>
          <v-layout justify-space-between pl-2 pr-2>
            <v-btn round outline @click="goBack">返回之前页面</v-btn>
            <v-btn round outline @click="setArticleParams('default')">返回文章首页</v-btn>
          </v-layout>

          <v-responsive>
            <v-expansion-panel>
              <v-layout column>
                <v-subheader>添加评论</v-subheader>
                <v-layout v-if="currentUser.id" pl-3 pr-3>
                  <v-text-field v-model="comment" label="评论" @keyup.enter="addComment"></v-text-field>
                </v-layout>
                <v-layout v-else column pl-2 pr-2>
                  <v-btn round depressed nuxt to="/login">抱歉，添加评论功能需要先登录才能开启</v-btn>
                </v-layout>
                <v-subheader>评论列表</v-subheader>
                <comment-card v-for="comment in comments" :key="comment.id" :comment="comment"></comment-card>
                <v-subheader>没有更多内容</v-subheader>                
              </v-layout>
            </v-expansion-panel>
          </v-responsive>

        </v-card>
      </v-flex>
    </v-layout>

    <v-snackbar v-model="snackbar" top color="success" auto-height>{{success}}</v-snackbar>

  </v-layout>
</template>

<script>
import JumbotronCard from '@/components/jumbotron-card'
import CommentCard from '@/components/comment-card'
import moment from 'moment'
import { md } from "@/static/js/markdown-it"

export default {

  head() {
    return {
      title: this.article.title,
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.article.tags },
        { hid: 'description', name: 'description', content: this.article.profile },

      ]
    }
  },

  components: {
    JumbotronCard,
    CommentCard,
  },

  validate({ params }) {
    return /^\d+$/.test(params.id)
  },

  async asyncData({ params, $axios }) {
    let article = await $axios.get(`/article/${params.id}/`)
    let comments = await $axios.get(`/comment/`, {params: {article: params.id}})
    let result = md.render(article.data.content)
    return {
      id: params.id,
      tags: article.data.tags? article.data.tags.split(',') : [],
      article: article.data,
      content: result,
      comments: comments.data,
      comment: '',
      snackbar: false,
      success: '',
      emojis: ['🍉','🍒','🍄','🌰','🍊','🍋','❤️','🍓','😗','😋']
    };
  },

  computed: {
    windowSize() {
      return this.$store.state.windowSize
    },
    parallaxHeight() {
      return (this.windowSize.x + this.windowSize.y) / 4 || 300
    },
    currentUser() {
      return this.$store.getters.cartCurrentUser
    },
    articleTime() {
      return moment(this.article.update_time).format('YYYY 年 MM 月 DD 日')
    },
    smallSize() {
      if (this.windowSize.x <= 600) return '64px'
      else return '76px'
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },
    setArticleParams(type, params) {
      let data
      if (type == 'tag') {
        data = {tag: params}
      } else if (type == 'default') {
        data = {}
      }
      this.$store.commit('setArticleParams', data)
      this.$router.push('/inspire')
    },
    async addComment() {
      let {data} = await this.$axios.post(`/comment/`, {article:this.article.id, content:this.comment})
      console.log(data)
      this.comments.unshift(data)
      this.comment = ''
      this.snackbar = true
      this.success = '评论添加成功！'
    }
  },

  
};
</script>

<style lang="stylus">
.auth-avatar
  position relative
  z-index 1
  top -100px
  height 0
  width 5em
  line-height 1.1
  margin-left 0
  color rgb(55, 53, 47)

.chip
  padding 0 6px

.markdown-content
  line-height 1.5
  img
    width auto
    height auto
    max-width 100%
    max-height 100%
  h1,h2,h3
    margin-bottom 16px
    border-bottom 1px solid #eaecef
  ul
    margin-bottom 16px
  blockquote
    padding 0 1em
    color #6a737d
    border-left .25em solid #dfe2e5
  code
    padding 0 10px
    border solid 1px #e1e4e5
    font-size 0.95em
    font-family SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",Courier,monospace !important
    box-shadow none !important
    background-color #f8f8f8
  code:before, code:after
      content ''
  pre
    padding 0 !important
    border solid 1px #e1e4e5
    background-color #f8f8f8 !important
    margin-bottom: 16px
    code
      margin 0 !important
      padding 6px 12px !important
      border none !important
      white-space pre !important
      word-break keep-all !important
      text-overflow ellipsis !important
      background-color rgba(0,0,0,0) !important
</style>

