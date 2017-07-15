import Vue from 'vue'
import App from './App.vue'
import ajax from './ajax'
import axios from 'axios'
import store from './store'

/*axios 直接在ajax引入或者全局注册，都会报错*/
Vue.use(ajax,axios);

/*时间过滤器*/
Vue.filter('getNowDate',function (nowDate) {

    var time = new Date(Math.floor(nowDate)),
        year = time.getFullYear(),
        month = time.getMonth() + 1,
        date = time.getDate(),
        hours = time.getHours(),
        minutes = time.getMinutes(),
        seconds = time.getSeconds();

    return [year, month, date].map(addZero).join('-') + ' ' + [hours, minutes, seconds].map(addZero).join(':');

    function addZero(v) {
        v = v.toString();
        return v[1] ? v : '0' + v
    }
});

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
