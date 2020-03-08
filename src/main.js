// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFirestore from 'vue-firestore';

import '@/styles/bulma.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

/* Paste your firebase configuration below */

Vue.use(VueFirestore);

/* Bind firebase to your Vue instance */
Vue.prototype.$liff = window.liff

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
