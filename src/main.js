import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
require('./libs/dates-formater/datesFormatter');

Vue.config.productionTip = false;
// Global Filters
Vue.filter('westernDate', (date) =>{
    let birthDay =  new Date(date);
    return birthDay.format("m/dd/yy");
});
Vue.filter('fullNameFormat', (name) =>{
    return `${name.first} ${name.last}`;
});
// axios HEADERS
axios.defaults.headers.common['Content-Type'] = 'application/json';

new Vue({
    router,
    store,
  render: h => h(App)
}).$mount('#app');
