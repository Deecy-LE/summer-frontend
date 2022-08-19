//login模块的仓库

import {
    post_login,get_user_info
} from "@/api";
import { setToken, getToken, removeToken } from "@/utils/token";
//登录与注册的模块
const state = {
    //token
    token: getToken(),
    //用户ID
    user_id:'',
    //用户信息
    userInfo: {}
};

//mutations:修改state的唯一手段
const mutations = {
    TOKEN(state, result) {
        console.log('传入TOKEN函数中的result:' + result);
        setToken(result);
        state.token = result;
    },
    //清除本地数据
    CLEAR(state) {
        //帮仓库中用户信息清空
        state.token = '';
        state.userInfo = {}
        removeToken();
    },
    //获取用户ID
    USERID(state, userid){
        console.log('传入USERID函数中的userid:' + userid);
        localStorage.setItem('USERID', userid);
        state.user_id = userid;
    },
    //保存用户信息
    USERINFO(state, userInfo){
        console.log(userInfo);
        state.userInfo = userInfo;
        localStorage.setItem('USERINFO', JSON.stringify(userInfo));
    
    }
};

//actions:处理业务逻辑,但不能直接修改state
const actions = {
    //登录
    async post_login({ commit }, data) {
        console.log('用户输入的信息');
        console.log(data);
        let result = await post_login(data);
        console.log('后端返回结果');
        console.log(result);
        if (result.data !== null) {  //登录成功
            //用户已经登录成功且获取到token
            commit("TOKEN", result.data.token);
            commit("USERID", result.data.user_id);
            //获取用户信息并保存
            let res = await get_user_info();
            commit("USERINFO", res.data);
        }
        //不管是否登录成功返回结果
        return result;
    },

    //退出登录
    async userLogout({ commit }) {
        commit("CLEAR");
        return 'ok';
    },
};

//getters:提供给组件计算好的数据
const getters = {
    getUserInfo:state =>{
        return state.userInfo
    },
    getUserName:state=>{
        return state.userInfo.user_name
    },
    getUserGender:state=>{
        return state.userInfo.user_gender
    },
    getUserEmail:state=>{
        return state.userInfo.user_email
    },
    getUserAvatar:state=>{
        return state.userInfo.user_avatar
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};