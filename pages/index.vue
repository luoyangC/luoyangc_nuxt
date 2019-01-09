<template>
  <v-layout align-center justify-center fill-height>
    <v-card color="rgba(255,255,255,0)" flat>
      <v-card-title >
        <v-layout align-center align-text>
          {{sentence.list[0]}}<br>
          {{sentence.list[1]}}<br>
        </v-layout>
      </v-card-title>
      <v-card-actions>
        <v-layout justify-space-around>
          <v-btn round outline depressed large nuxt to="/inspire">GitHub</v-btn>
          <v-btn round outline depressed large nuxt to="/inspire">Start</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  async asyncData() {
    return {
      sentence: {
        list: ["醉后不知天在水", "满船清梦压星河"]
      }
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
  font-size 40px
</style>
