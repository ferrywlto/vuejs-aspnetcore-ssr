import Vue from 'vue'
import App from './components/App.vue'
import store from './vuex/store.js'
import router from './router'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

const app = new Vue({
  router,
  store,
  ...App // ... is spread operator if App is Array; is rest(remaining) properties if App is Object
})

export {
  app,
  router,
  store
}
