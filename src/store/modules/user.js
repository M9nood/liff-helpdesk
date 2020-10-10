const user = {
  namespaced: true,
  state : {
    user : {}
  },
  getters: {
    getUser (state) {
      return state.user
    }
  },
  mutations : {
    SET_USER: (state, user) => {
      state.user = user
    },
  },
  actions : {
    setUserData({commit}, user_data){
      commit('SET_USER',user_data)
    }
  }
}

export default user
