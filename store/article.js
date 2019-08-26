/*
 * @Author: luoyang
 * @Date: 2019-08-10 17:01:30
 * @Last Modified by: luoyang
 * @Last Modified time: 2019-08-24 15:51:44
 */
export const state = () => ({
  articleParams: {},
  categories: [],
  archives: []
})

export const getters = {
  articleParams: state => state.articleParams
}

export const mutations = {
  SET_ARTICLE_PARAMS(state, data) {
    state.articleParams = data
  }
}

export const actions = {
  setArticleParams(context, data) {
    context.commit('SET_ARTICLE_PARAMS', data)
  }
}
