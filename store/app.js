/*
 * @Author: luoyang
 * @Date: 2019-08-10 17:01:30
 * @Last Modified by: luoyang
 * @Last Modified time: 2019-08-24 16:26:49
 */

// 根据时间自动切换夜间模式
const autoDark = () => {
  const now = new Date()
  const hours = now.getHours()
  if (hours <= 6 || hours <= 18) {
    return false
  } else {
    return true
  }
}

export const state = () => ({
  clipped: false,
  drawer: false,
  them: '',
  font: '',
  dark: false,
  fontSize: 14,
  offsetTop: 0,
  randomImage: [],
  windowSize: { x: 0, y: 0 }
})

export const getters = {
  drawer: state => state.drawer,
  clipped: state => state.clipped,
  dark: state => state.dark,
  them: state => state.them,
  font: state => state.font,
  windowSize: state => state.windowSize,
  randomImage: state => state.randomImage,
  offsetTop: state => state.offsetTop,
  fontSize: state => state.fontSize
}

export const mutations = {
  SET_THEM(state, data) {
    state.them = data
  },
  SET_FONT(state, data) {
    state.font = data
  },
  SET_DARK(state, data) {
    state.dark = data
  },
  SET_WINDOW_SIZE(state, data) {
    state.windowSize = data
  },
  SET_RANDOM_IMAGE(state, data) {
    state.randomImage = data
  },
  SET_OFFSET_TOP(state, data) {
    state.offsetTop = data
  },
  SET_FONT_SIZE(state, data) {
    state.fontSize = data
  },
  SET_DRAWER(stae, data) {
    stae.drawer = data
  }
}

export const actions = {
  setWindowSize(context, data) {
    context.commit('SET_WINDOW_SIZE', data)
    const _width = data.x
    let _size
    if (_width <= 600) _size = 12
    else if (_width > 600 && _width <= 960) _size = 14
    else _size = 16
    context.commit('SET_FONT_SIZE', _size)
  },
  setRandomImage(context) {
    const randomImage = []
    for (let index = 0; index < 10; index++) {
      randomImage.push(Math.floor(Math.random() * 200))
    }
    context.commit('SET_RANDOM_IMAGE', randomImage)
  },
  setOffsetTop(context, data) {
    context.commit('SET_OFFSET_TOP', data)
  },
  setFontSize(context, data) {
    context.commit('SET_FONT_SIZE', data)
  },
  setFont(context, data) {
    context.commit('SET_FONT', data)
  },
  setDrawer(context, data) {
    context.commit('SET_DRAWER', data)
  },
  setThem(context, data) {
    let them = ''
    let dark = false
    if (data === 0) {
      dark = autoDark()
    }
    if (data === 1) {
      dark = false
      them = 'them-default'
    }
    if (data === 2) {
      dark = true
      them = 'them-medium'
    }
    if (data === 3) {
      dark = false
      them = 'them-height'
    }
    context.commit('SET_THEM', them)
    context.commit('SET_DARK', dark)
  }
}
