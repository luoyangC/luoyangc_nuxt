/*
 * @Author: luoyang 
 * @Date: 2019-08-10 17:21:19 
 * @Last Modified by: luoyang
 * @Last Modified time: 2019-08-10 17:22:02
 */
export const state = () => ({
  currentUser: { id: null, image: '/icons/xigua.png' }
})

export const getters = {
  currentUser: state => state.currentUser
}

export const mutations = {
  SET_CURRENT_USER(state, data) {
    state.currentUser = data
  }
}

export const actions = {
  setCurrentUser(context, data) {
    context.commit('SET_CURRENT_USER', data)
  }
}