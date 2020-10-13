import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import app from '@/store/modules/app'
import user from '@/store/modules/user'


const store = new Vuex.Store({
  modules: {
    app,
    user
  }
})

export default store
