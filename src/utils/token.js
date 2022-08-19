//存储token
export const setToken = (token) => {
  localStorage.setItem("TOKEN", token);
};
//获取token
export const getToken = () => {
  return localStorage.getItem("TOKEN");
};

//清除本地存储的token
export const removeToken=()=>{
   localStorage.removeItem("TOKEN");
   //顺便清理用户信息
   localStorage.removeItem("USERINFO");
   localStorage.removeItem("USERID")

}
