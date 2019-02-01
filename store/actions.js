export default {
  setWindowSize(context, data) {
    context.commit('setWindowSize', data)
  },
  setRandomImage(context, data) {
    context.commit('setRandomImage', data)
  },
  setCurrentUser(context, data) {
    context.commit('setCurrentUser', data)
  },
  setArticleParams(context, data) {
    context.commit('setArticleParams', data)
  }
}
