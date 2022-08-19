import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from 'axios';
import api from './api'
import { Message } from 'element-ui';
//注册全局组件
import Header from '@/components/Header'
Vue.component("Header",Header);
Vue.use(ElementUI);
Vue.use(mavonEditor)
Vue.prototype.$axios = axios
Vue.prototype.$api = api
Vue.prototype.$message = Message


new Vue({
  //注册路由
  router,
  store,
  el: '#app',
  render: h => h(App),
}).$mount('#app')
