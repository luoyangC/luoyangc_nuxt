<template>
  <v-layout column>

    <jumbotron-card :height="parallaxHeight" title="留言" lines="最后编辑于 2018 年 08 月 23 日" image="https://luoyangc.oss-cn-shanghai.aliyuncs.com/media/image/random/ims%20%2848%29.png"/>

    <v-layout wrap justify-center>
      <v-flex xs12 sm10 md8 lg6 xl6 mb-5 mt-2 ml-2 mr-2>

          <v-list three-line subheader>

            <v-subheader>添加留言</v-subheader>
            <v-card flat>
              <v-card-text>
                <v-textarea auto-grow clearable label="input message"></v-textarea>
                <v-btn round depressed>直接发送</v-btn>
                <v-btn round depressed>匿名发送</v-btn>
              </v-card-text>
            </v-card>

            <v-subheader>最近留言</v-subheader>
            <v-card flat v-for="message in messages" :key="message.id">
              <v-list-tile avatar>

                <v-list-tile-avatar>
                  <img :src="message.author.image">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-text="message.author.username"></v-list-tile-title>
                  <v-list-tile-sub-title v-text="message.content"></v-list-tile-sub-title>
                </v-list-tile-content>
              
              </v-list-tile>

              <v-divider v-if="message.id != lastMessageId" inset></v-divider>
            </v-card>
          </v-list>
      </v-flex>
    </v-layout>

  </v-layout>
</template>

<script>
import JumbotronCard from '@/components/jumbotron-card'
import { getMessage } from "@/api"

export default {
  components: {
    JumbotronCard,
  },
  async asyncData() {
    let { data } = await getMessage()
    console.log(data)
    return {
      messages: data
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
    }
  },
}
</script>

<style lang="stylus" scoped>  
</style>
