import Vue from 'vue'
import Router from 'vue-router'
const RequestTicket = () => import('@/components/RequestTicket')
const IndexHelpdesk = () => import('@/components/IndexHelpdesk')
const Login = () => import('@/components/Login')
const Layout = () => import('@/layouts/Layout')

Vue.use(Router)
const router = new Router({
  mode : 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'LayoutHelpdesk',
      component: Layout,
      children : [
        {
          path: '',
          name: 'RequestTicket',
          component: RequestTicket
        },
      ]
    }
  ]
})

export default router
