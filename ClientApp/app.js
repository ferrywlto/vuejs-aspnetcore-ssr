import Vue from 'vue';
import App from './components/App.vue';
import store from './vuex/store.js';
const app = new Vue({
    store,
    ...App //... is spread operator if App is Array; is rest(remaining) properties if App is Object
});

app.$mount('#app');