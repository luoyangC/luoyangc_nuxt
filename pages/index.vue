<template>
  <v-layout align-center justify-center fill-height>
    <v-card color="transparent" flat>
      <v-card-title>
        <v-layout column mb-2>
          <v-layout align-center align-text css1c87221934204ff>
            {{ sentence.lines[0] }}<br>
            {{ sentence.lines[1] }}<br>
          </v-layout>
          <v-layout align-center justify-center>
            <img height="30" width="30" :src="logo">
          </v-layout>
        </v-layout>
      </v-card-title>
      <v-card-actions>
        <v-layout justify-space-around pt-2>
          <v-btn round outline depressed :href="github">GitHub</v-btn>
          <v-btn round outline depressed nuxt to="/inspire">Start</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const { data } = await $axios.get(`/sentence/1/`) // 获取第定场诗一个句
    return {
      sentence: data,
      logo: 'https://luoyangc.oss-cn-shanghai.aliyuncs.com/media/image/icons/yinzhang.png',
      github: 'https://github.com/luoyangC/luoyangc_nuxt'
    }
  }
}
</script>

<style lang="stylus" scoped>
.align-text
  -webkit-writing-mode vertical-rl
  writing-mode vertical-rl
  padding-bottom 30px
  font-size 2.0em
</style>
