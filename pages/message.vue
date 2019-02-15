<template>
  <v-layout column>

    <jumbotron-card :height="parallaxHeight" title="留言" lines="最后编辑于 2018 年 08 月 23 日" :image="currentImage"/>

    <v-layout wrap justify-center>
      <v-flex xs12 sm10 md8 lg6 xl6 mb-5 mt-2 ml-2 mr-2>

          <v-list three-line subheader>

            <v-subheader>添加留言</v-subheader>
            <v-card flat>
              <v-card-text v-if="currentUser.id">
                <v-textarea v-model="content" auto-grow clearable label="input message" counter="100"></v-textarea>
              </v-card-text>
              <v-card-text v-else>抱歉，添加留言功能需要先登录才能开启</v-card-text>
              <v-card-actions>
                <v-layout v-if="currentUser.id">
                  <v-btn round depressed @click="addMessage(false, currentUser.id)">直接发送</v-btn>
                  <v-btn round depressed @click="addMessage(true, currentUser.id)">匿名发送</v-btn>
                </v-layout>
                <v-layout v-else>
                  <v-btn round depressed nuxt to="/login">点击登录</v-btn>
                </v-layout>
              </v-card-actions>
            </v-card>

            <v-subheader>最近留言</v-subheader>
            <v-card flat v-for="message in messages" :key="message.id">
              <v-list-tile avatar>

                <v-list-tile-avatar>
                  <img :src="message.author.image">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="message.author.username"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="message.content"></v-list-tile-sub-title>
                </v-list-tile-content>
              
              </v-list-tile>

              <v-divider v-if="message.id != lastMessageId" inset></v-divider>
            </v-card>
          </v-list>
      </v-flex>
    </v-layout>

    <v-snackbar v-model="snackbar" top color="success" auto-height>{{success}}</v-snackbar>
    
    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6 xl6>
        <v-layout justify-space-between>
          <v-btn round outline nuxt to="/archives">记录</v-btn>
          <v-spacer/>
          <v-btn round outline nuxt to="/cross">动态</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>

  </v-layout>
</template>

<script>
import JumbotronCard from '@/components/jumbotron-card'

export default {
  components: {
    JumbotronCard,
  },

  async asyncData({app, $axios}) {
    let imageId = app.store.getters.cartRandomImage[2] || 100
    let { data } = await $axios.get(`/message/`)
    console.log(data)
    return {
      success: '',
      snackbar: false,
      content: '',
      messages: data,
      currentImage: `https://luoyangc.oss-cn-shanghai.aliyuncs.com/media/image/random/${imageId}.png`,
    }
  },

  computed: {
    windowSize() {
      return this.$store.state.windowSize
    },
    parallaxHeight() {
      return (this.windowSize.x + this.windowSize.y) / 4
    },
    lastMessageId() {
      return this.messages[this.messages.length - 1].id
    },
    currentUser() {
      return this.$store.getters.cartCurrentUser
    }
  },

  methods: {
    async addMessage(anonymous, user) {
      let {data} = await this.$axios.post(`/message/`, {anonymous, user, content: this.content})
      this.messages.unshift(data)
      this.content = ''
      this.snackbar = true
      this.success = '留言添加成功！'
    }
  }

}
</script>
