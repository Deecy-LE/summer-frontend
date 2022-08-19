//对API进行统一管理

import requests from './request';

//用户登录
export const post_login = (params) => {
  return requests({
    method: 'post',
    url: `/user/login`,
    data: params
  });
}
//用户注册
export const put_regester = (params) => {
  return requests({
    method: 'put',
    url: `/user/register`,
    data: params
  });
}
//获取邮箱验证码
export const get_email_code = (params) => {
  return requests({
    method: 'post',
    url: `/user/email/code`,
    data: params
  });
}
//获取用户信息
export const get_user_info = () => {
  return requests({
    method: 'get',
    url: `/user/info`,
  });
}
//修改个人信息
export const modify_user_message = (params) => {
  return requests({
    method: 'post',
    url: '/user/modify',
    data: params
  });
}
//查看首页帖子
export const get_blog_home = (params) => {
  return requests({
    method: 'get',
    url: '/blog/home/list',
    params: params,
  });
}
//获取某个用户发布的所有帖子
export const get_user_blog = (user_id) => {
  return requests({
    method: 'get',
    url: '/blog/space/list?UserID=' + user_id,
  });
}
//获取某个帖子内容
export const get_blog_detail = (blog_id) => {
  return requests({
    method: 'get',
    url: '/blog/info?blog_id=' + blog_id,
  });
}
//发布帖子
export const post_blog = (params) => {
  return requests({
    method: 'post',
    url: `/blog/post`,
    data: params
  });
}
//发表评论
export const post_comment = (params) => {
  return requests({
    method: 'put',
    url: `/blog/comment/post`,
    data: params
  });
}
//获取当前帖子下的评论
export const get_comment = (blog_id) => {
  return requests({
    method: 'get',
    url: '/blog/comment/list?blog_id=' + blog_id,
  });
}
//点赞/取消点赞
export const post_like = (params) => {
  return requests({
    method: 'post',
    url: `/blog/like`,
    data: params
  });
}
//当前用户是否点赞过当前blog
export const post_islike = (params) => {
  return requests({
    method: 'post',
    url: '/blog/if/liked',
    data: params,
  });
}






