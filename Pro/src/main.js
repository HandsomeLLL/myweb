// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import myaxios from './assets/js/myaxios'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import '../src/assets/css/app.css'


Vue.use(ElementUI)
Vue.use(myaxios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
