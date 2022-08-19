import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex);

import user from "./user";
import blog from "./blog"
export default new Vuex.Store({
    state:{

    },
    mutations:{

    },
    actions:{
        
    },
    modules:{
        user,blog
    }
});