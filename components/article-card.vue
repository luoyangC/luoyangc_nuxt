<template>
  <v-card class="article-card" nuxt :to="'/content/' + article.id">
    <v-img class="white--text" :height="articleHeight" :src="article.image">
      <v-container dark-background fill-height fluid>
        <v-layout column fill-height justify-center align-center>
          <h1 class="mb-3">{{ article.title }}</h1>
          <h3>{{ articleTime }} • {{ article.category }}</h3>
        </v-layout>
      </v-container>
    </v-img>
  </v-card>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    article: {
      type: Object,
      default: () => {}
    },
    articleHeight: {
      type: Number,
      default: -1
    }
  },
  computed: {
    articleTime() {
      return moment(this.article.update_time).format('YYYY年MM月DD日')
    }
  }
}
</script>

<style lang="stylus" scoped>
.article-card
  width 100%
  border-radius: .5rem
  -webkit-transition: .3s ease all
  -moz-transition: .3s ease all
  -ms-transition: .3s ease all
  -o-transition: .3s ease all
  transition: .3s ease all

.article-card:hover
  box-shadow: 0 20px 60px rgba(0,0,0,0.2)
  -webkit-transform: translateY(-4px) scale(1.05)
  -moz-transform: translateY(-4px) scale(1.05)
  -ms-transform: translateY(-4px) scale(1.05)
  -o-transform: translateY(-4px) scale(1.05)
  transform: translateY(-4px) scale(1.05)
</style>

