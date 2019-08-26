const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'keywords', name: 'keywords', content: '骆杨的博客' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icons/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      { rel: 'stylesheet', href: 'http://cdn.repository.webfont.com/webfonts/nomal/132351/45904/5d4e11edf629d8131cfafe3b.css' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {
    duration: 20000,
    color: '#00838f',
    height: '3px'
  },

  /*
  ** Global CSS
  */
  css: [
    '~/static/style/app.styl',
    '~/static/font/iconfont.css',
    '~/static/live2d/css/live2d.css',
    '~/node_modules/highlight.js/styles/a11y-light.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/vuetify', ssr: true },
    { src: '@/plugins/axios', ssr: true },
    { src: '@/static/font/iconfont.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: [/(node_modules)/, /(static)/]
        })
      }
    }
  }
}
