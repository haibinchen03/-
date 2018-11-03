import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'normalize.css'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css';
import http from 'axios' //第二种后台请求导入方法

Vue.config.productionTip = false;
Vue.use(MintUI);
http.defaults.withCredentials = true;//跨域请求
Vue.prototype.$http = http; //第二种后台请求导入方法

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
