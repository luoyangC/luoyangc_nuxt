<template>
  <v-layout column>
    <v-layout column justify-center>
      <v-parallax height="800" dark src="https://luoyangc.oss-cn-shanghai.aliyuncs.com/media/image/random/ims%20%2890%29.png">
        <v-layout column align-center justify-center>
          <h1 class="display-3 font-weight-medium mb-3">Amor</h1>
          <h3 class="display-1 font-weight-medium">Welcom to my blog!</h3>
        </v-layout>
      </v-parallax>
    </v-layout>

    <v-layout wrap justify-center>
      <v-flex xs12 sm10 md8 lg6 xl6 v-for="article in articles" :key="article.id" mt-5 ml-2 mr-2>
        <v-card class="article-card">
          <v-img class="white--text" height="250px" :src="article.src">
            <v-container dark-background fill-height fluid>
              <v-layout fill-height justify-center align-center>
                <h1 class="display-2 font-weight-medium mb-3">{{article.title}}</h1>
              </v-layout>
            </v-container>
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>

  </v-layout>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      articles: [
        {
          id: 0,
          title: "Django",
          src: "https://luoyangc.oss-cn-shanghai.aliyuncs.com/media/image/random/ims%20%2820%29.png"
        },
        {
          id: 1,
          title: "Flask",
          src: "https://luoyangc.oss-cn-shanghai.aliyuncs.com/media/image/random/ims%20%2821%29.png"
        },
        {
          id: 2,
          title: "Docker",
          src: "https://luoyangc.oss-cn-shanghai.aliyuncs.com/media/image/random/ims%20%2822%29.png"
        },
        {
          id: 3,
          title: "Spring",
          src: "https://luoyangc.oss-cn-shanghai.aliyuncs.com/media/image/random/ims%20%2823%29.png"
        },
        {
          id: 4,
          title: "Python",
          src: "https://luoyangc.oss-cn-shanghai.aliyuncs.com/media/image/random/ims%20%2825%29.png"
        }
      ]
    }
  },
};
</script>

<style lang="stylus" scoped>
.dark-background
  background-color rgba(0,0,0,.5)
.article-card
  width 100%
  border-radius 10px
  transition width .3s
  -moz-transition width .3s
  -webkit-transition width .3s
  -o-transition width .3s
.article-card:hover
  width 100%
</style>
