//对API进行统一管理

import requests from './request';


//用户登录
export const post_login = (params) => {
  return requests({
    method: 'post',
    url: `/login`,
    data: params
  });
}
//用户访问space
export const get_space = (params) => {
  return requests({
    method: 'get',
    url: `/space`,
    params:params,
  });
}
//用户请求logout
export const get_logout = () => {
  return requests({
    method: 'get',
    url: `/logout`,
  });
}









