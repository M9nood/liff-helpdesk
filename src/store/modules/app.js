const app = {
  namespaced: true,
  state : {
    window : {
      screen : '',
      width : 0,
      height : 0
    }
  },
  getters : {
    getScreen : (state) => {
      return state.window.screen
    },
    getWindow :(state) => {
      return state.window
    }
  },
  mutations : {
    SET_WINDOW : (state,win_data) => {
      if(win_data.screen) state.window.screen = win_data.screen
      if(win_data.width) state.window.width = win_data.width
      if(win_data.height) state.window.height = win_data.height
    },
  },
  actions : {
    setWindowHandle({commit},win_data){
      commit('SET_WINDOW',win_data)
    }
  }
}
export default app
