import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '../components/Dashboard.vue'
import Messages from '../components/Messages.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
        { path: '/', component: Dashboard },
        { path: '/messages', component: Messages }
  ]
})

export default router
