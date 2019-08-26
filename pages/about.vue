<template>
  <v-layout column>
    <!-- 顶部图片 -->
    <jumbotron-card :height="parallaxHeight" :image="currentImage">
      <v-avatar size="100" color="grey lighten-4">
        <img class="rotate" src="https://luoyangc.oss-cn-shanghai.aliyuncs.com/media/image/icons/xigua.png" alt="avatar">
      </v-avatar>
      <h1 class="title-text font-weight-bold display-2 mb-3">Amor</h1>
    </jumbotron-card>
    <!-- 文字介绍 -->
    <v-layout wrap justify-center>
      <v-flex xs12 sm10 md8 lg6 xl6 mb-5 mt-2 ml-2 mr-2>
        <v-card flat>
          <v-card-title>
            <h2>『关于我』 About me</h2>
          </v-card-title>
          <v-card-text>
            <ul>
              <li>2019年毕业于南京信息工程大学滨江学院计算机系网络工程专业</li>
              <li>虽然所学为网络工程专业，但个人爱好更偏向于编程和Web方向，喜欢专研技术</li>
              <li>使用最熟练的编程语言是Python，熟悉Python Web主流框架，包括Flask、Django</li>
              <li>同时也熟悉使用Python的分布式爬虫框架Scrapy，以及基于Java的搜索引擎框架ElasticSearch</li>
              <li>对于前端技术也有一定的了解，比如基本的HTML、CSS、JS，熟悉使用前端框架Vue.js</li>
              <li>对于服务器部署方面也有一定的了解，熟悉Linux常用命令，熟悉Docker、Nginx等服务器软件</li>
              <li>对于新兴技术有着强烈的学习兴趣，如大数据、区块链、机器学习、人工智能等都有广泛关注</li>
              <li>未来发展目标是成为一名全栈工程师，目前积极寻找实习机会</li>
            </ul>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm10 md8 lg6 xl6 mb-5 mt-2 ml-2 mr-2>
        <v-card flat>
          <v-card-title>
            <h2>『关于本站』 About this</h2>
          </v-card-title>
          <v-card-text>
            <ul>
              <li>本站于2018年10月18日上线</li>
              <li>本站域名注册和服务器托管均使用<a href="https://www.aliyun.com/"> 阿里云</a></li>
              <li>本站是一个前后端分离的项目，通过RESTful API进行数据交互</li>
              <li>前端使用Nuxt.js构建，后端使用Python的Django构建，数据库使用Mysql，缓存使用Redis，服务器使用Nginx</li>
              <li>整个项目通过Docker打包上线，所有源代码都以同步到我的 <a href="https://github.com/luoyangC">Github</a></li>
            </ul>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm10 md8 lg6 xl6 mb-5 mt-2 ml-2 mr-2>
        <v-card flat>
          <v-card-title>
            <h2>『联系方式』 Call me</h2>
          </v-card-title>
          <v-card-text>
            <ul>
              <li>QQ: 1769570627</li>
              <li>Phone: 15261829198</li>
              <li>Email: luoyang0823@foxmail.com</li>
              <li>Gitee: <a href="https://gitee.com/luoyang_C">https://gitee.com/luoyang_C</a></li>
              <li>GitHub: <a href="https://github.com/luoyangC">https://github.com/luoyangC</a></li>
              <li>LeetCode: <a href="https://leetcode-cn.com/luoyangc">https://leetcode-cn.com/luoyangc</a></li>
            </ul>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- 底部导航 -->
    <page-bottom prev="/cross" next="/inspire" prev-name="动态" next-name="文章" />
  </v-layout>
</template>

<script>
import JumbotronCard from '@/components/jumbotron-card'
import PageBottom from '@/components/PageBottom'
import { mapGetters } from 'vuex'
export default {
  components: {
    JumbotronCard,
    PageBottom
  },
  computed: {
    ...mapGetters('app', [
      'parallaxHeight'
    ])
  },
  async asyncData({ app }) {
    const imageId = app.store.getters['app/randomImage'][4] || 100
    return {
      currentImage: `https://luoyangc.oss-cn-shanghai.aliyuncs.com/media/image/random/${imageId}.png`
    }
  }
}
</script>
