import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'
import User from '../components/user/user.vue'
import Carlist from '../components/carlist/carlist.vue'
import Quanlist from '../components/quanlist/quanlist.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      path: '/user',
      component: User
    }, {
      path: '/carlist',
      component: Carlist
    }, {
      path: '/quanlist',
      component: Quanlist
    }]
  }]
})
