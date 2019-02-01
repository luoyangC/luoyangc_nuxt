<template>
  <v-layout justify-center pt-2 pb-2>
    <v-flex>
      <v-card flat>

        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img :src="comment.user.image">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-text="comment.user.username"></v-list-tile-title>
            <v-list-tile-sub-title>2018.10.1</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <V-layout v-if="comment.is_like" justify-end align-center>
              <v-btn icon small @click="delLike(comment.is_like)">
                <v-icon class="iconfont" color="red">icon-praise_fill</v-icon>
              </v-btn>
              <span>&nbsp;{{comment.like_nums}}</span>
            </V-layout>

            <V-layout v-else justify-end align-center>
              <v-btn icon small @click="addLike('comment', comment.id)">
                <v-icon class="iconfont">icon-praise</v-icon>
              </v-btn>
              <span>&nbsp;{{comment.like_nums}}</span>
            </V-layout>
          </v-list-tile-action>
        </v-list-tile>

        <v-card-text class="comment-content">{{comment.content}}</v-card-text>

        <v-card-actions class="comment-content" @click="setToUser(comment.user)">
          <v-expansion-panel-content lazy ripple v-model="expansion">
            <v-card flat slot="header" v-if="comment.reply_nums > 0">
              <v-icon class="iconfont">icon-comments</v-icon>&nbsp;{{comment.reply_nums}}&nbsp;查看全部回复
            </v-card>
            <v-card flat slot="header" v-else>
              <v-icon class="iconfont">icon-comments</v-icon>&nbsp;{{comment.reply_nums}}&nbsp;点击添加回复
            </v-card>
            <v-card @click.stop>
              <v-layout v-for="reply in replies" :key="reply.id" v-ripple @click.stop="setToUser(reply.from_user)" mb-3>
                <reply-card :reply="reply"></reply-card>
              </v-layout>
              <v-text-field v-if="currentUser.id" v-model="reply" :label="'回复 ' + toUser.username" @keyup.enter="addReplay"></v-text-field>
            </v-card>
          </v-expansion-panel-content>
        </v-card-actions>
        <v-layout pr-3>
        <v-divider v-show="!expansion" inset></v-divider>
        </v-layout>
      </v-card>
    </v-flex>
    <v-snackbar v-model="snackbar" top color="success" auto-height>{{success}}</v-snackbar>
  </v-layout>
</template>

<script>
import ReplyCard from '@/components/reply-card'

export default {
  components: {
    ReplyCard,
  },
  props: {
    comment: Object
  },
  data() {
    return {
      snackbar: false,
      success: '',
      reply: '',
      toUser: {
        id: null,
        username: null,
      },
      replies: [],
      expansion: false
    }
  },
  computed: {
    // 获取当前登录用户
    currentUser() {
      return this.$store.getters.cartCurrentUser
    }
  },
  methods: {
    // 指定添加回复的接收者
    setToUser(user) {
      console.log(user)
      this.toUser = user
    },
    // 获取数据
    async getData() {
      // 获取回复列表
      let {data} = await this.$axios.get(`/reply/`, {params: {comment: this.comment.id}})
      this.replies = data
    },
    // 点赞
    async addLike(type, id) {
      let {data} = await this.$axios.post(`/like/`, {like_type: type, like_id: id})
      this.comment.like_nums ++
      this.comment.is_like = data.id
    },
    // 取消点赞
    async delLike(id) {
      let {data} = await this.$axios.delete(`/like/${id}/`)
      this.comment.like_nums --
      this.comment.is_like = false
    },
    // 添加回复
    async addReplay() {
      let {data} = await this.$axios.post(`/reply/`, {comment:this.comment.id,to_user_id: this.toUser.id, content:this.reply})
      console.log(data)
      this.replies.unshift(data)
      this.reply = ''
      this.comment.reply_nums ++
      this.snackbar = true
      this.success = '回复添加成功！'
    }
  },
  mounted() {
    // 只有在存在回复的情况下才发送请求
    if (this.comment.reply_nums > 0) this.getData()
  }
};
</script>

<style lang="stylus">
.comment-content
  padding 0 16px 0 72px
  .v-expansion-panel__header
    padding 0 !important
</style>
