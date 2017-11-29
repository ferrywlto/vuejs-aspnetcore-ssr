import Vue from 'vue'
import App from './components/App.vue'
import store from './vuex/store.js'
import router from './router'

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
