<template>
  <v-layout column>

    <jumbotron-card :height="parallaxHeight" :title="article.title" :lines="`${articleTime} • 阅读数: ${article.view_nums}`" :image="article.image"/>

    <v-layout wrap justify-center>
      <v-flex xs12 sm10 md8 lg6 xl6 mb-5 mt-2 ml-2 mr-2>
        <v-card flat>
          <v-card-title>
            <span>标签: </span>
            <v-chip small v-for="(tag, index) in tags" :key="index" v-text="tag" @click="setArticleParams('tag', tag)"></v-chip>
          </v-card-title>
          <v-card-text v-html="content" class="markdown-content"></v-card-text>
          <v-layout pl-3 pr-3 pb-3>
            <v-divider></v-divider>
          </v-layout>
          <v-layout justify-space-between pl-2 pr-2>
            <v-btn round outline @click="goBack">返回文章列表</v-btn>
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
                  <v-btn round depressed nuxt to="/login">抱歉，添加评论功能需要先登录才能开启，点击登录</v-btn>
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
      tags: article.data.tags.split(','),
      article: article.data,
      content: result,
      comments: comments.data,
      comment: '',
      snackbar: false,
      success: ''
    };
  },

  computed: {
    windowSize() {
      return this.$store.state.windowSize
    },
    parallaxHeight() {
      return (this.windowSize.x + this.windowSize.y) / 4
    },
    currentUser() {
      return this.$store.getters.cartCurrentUser
    },
    articleTime() {
      return moment(this.article.update_time).format('YYYY 年 MM 月 DD 日')
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
  }
};
</script>

<style lang="stylus">
.markdown-content
  line-height 1.5
  img
    width auto
    height auto
    max-width 100%
    max-height 100%
</style>

