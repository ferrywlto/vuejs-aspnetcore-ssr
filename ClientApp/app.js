import Vue from 'vue';
import App from './components/App.vue';

const app = new Vue({
    ...App //... is spread operator if App is Array; is rest(remaining) properties if App is Object
});

app.$mount('#app');