import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  watch: {
    '$route.path': function (to, from) {
      console.log(from, to)
    }
  },
  render: h => h(App)
}).$mount('#app')

axios.defaults.baseURL = '/api'

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (sessionStorage.getItem("online")) {
      next();
    } else {
      next({
        path: '/'
      });
    }
  } else {
    next();
  }

  if (to.fullPath === '/') {
    if (sessionStorage.getItem('online')) {
      next({
        path: from.fullPath
      });
    } else {
      next();
    }
  }
})