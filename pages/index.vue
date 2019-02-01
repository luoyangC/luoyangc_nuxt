<template>
  <v-layout align-center justify-center fill-height>
    <v-card color="rgba(255,255,255,0)" flat>
      <v-card-title >
        <v-layout align-center align-text>
          {{sentence.lines[0]}}<br>
          {{sentence.lines[1]}}<br>
        </v-layout>
      </v-card-title>
      <v-card-actions>
        <v-layout justify-space-around>
          <v-btn round outline depressed large href="https://github.com/luoyangC/luoyangc_nuxt">GitHub</v-btn>
          <v-btn round outline depressed large nuxt to="/inspire">Start</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  async asyncData({$axios}) {
    let {data} = await $axios.get(`/sentence/1/`)
    return {
      sentence: data
    }
  },
};
</script>

<style lang="stylus" scoped>
.align-text
  -webkit-writing-mode vertical-rl
  writing-mode vertical-rl
  padding-bottom 50px
  font-family STXingkai !important
  font-size 2.5em
</style>
