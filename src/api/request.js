//对axios二次封装
import axios from "axios";
import store from '@/store';

const requests = axios.create({
    timeout:5000,                                  
});

requests.defaults.withCredentials = true    //全局设置axios允许携带cookie进行访问 

//请求拦截
requests.interceptors.request.use((config)=>{
//需要携带token带给服务器
  if(store.state.user.token){
    config.headers.Authorization =  "Bearer "+store.state.user.token;
  }
    return config;
});
//响应拦截
requests.interceptors.response.use(
    (res)=>{
    return res.data;
},
(err) => {
    alert("http请求失败");
    console.log(err);
    return err;
  }
);

//对外暴露
export default requests;
