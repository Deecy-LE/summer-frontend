//login模块的仓库

import {
    post_login,
} from "@/api";
import { setToken, getToken, removeToken } from "@/utils/token";
//登录与注册的模块
const state = {
    token: getToken(),
};

//mutations:修改state的唯一手段
const mutations = {
    TOKEN(state, result) {
        setToken(result);
        state.token = result;
    },

    //清除本地数据
    CLEAR(state) {
        //帮仓库中用户信息清空
        state.token = '';
        removeToken();
    },

};

//actions:处理业务逻辑,但不能直接修改state
const actions = {
    //登录
    async post_login({ commit }, data) {
        console.log(data);
        let result = await post_login(data);
        if (result.code == 1) {  //登录成功
            //用户已经登录成功且获取到token
            commit("TOKEN", result.token);
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

};

export default {
    state,
    mutations,
    actions,
    getters
};