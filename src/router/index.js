import Vue from 'vue'
import Router from 'vue-router'
const Ticket = () => import('@/components/Tickets')

Vue.use(Router)

export default new Router({
  mode : 'history',
  routes: [
    {
      path: '/',
      name: 'Ticket',
      component: Ticket
    }
  ]
})
