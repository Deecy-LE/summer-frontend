//对axios二次封装
import axios from "axios";
import store from '@/store';
import { Message } from "element-ui";
const requests = axios.create({
  timeout: 5000,
});

requests.defaults.withCredentials = true    //全局设置axios允许携带cookie进行访问 

//请求拦截
requests.interceptors.request.use((config) => {
  //需要携带token带给服务器
  if (store.state.user.token) {
    config.headers.Authorization = "Bearer " + store.state.user.token;
  }
  return config;
});
//响应拦截
requests.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    console.log('显示err:');
    console.log(err);
    Message.error('http请求失败');
    // alert("http请求失败");
    return err;
  }
);

//对外暴露
export default requests;
