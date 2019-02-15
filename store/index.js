//引入vue
import Vue from 'vue'
//全局引入vueX
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

//全局注册vueX
Vue.use(Vuex)

const windowSize = {x: 0, y: 0}

const randomImage = []

const currentUser = { id: null, image: '/icons/xigua.png' }

const articleParams = {}

const state = {
  windowSize,
  randomImage,
  currentUser,
  articleParams,
}

export default () => new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
})