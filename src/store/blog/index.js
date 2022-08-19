//博客模块的全局状态

const state = {
    //最后一个帖子的时间戳
    lastTimeStamp:''
};

//mutations:修改state的唯一手段
const mutations = {
    LASTTIMESTAMP(state, time) {
        console.log('传入CREATETIMESTAMP函数中的time:' + time);
        state.lastTimeStamp = time;
    },
};

//actions:处理业务逻辑,但不能直接修改state
const actions = {
    
};

//getters:提供给组件计算好的数据
const getters = {
    getLastTimeStamp:state =>{
        return state.lastTimeStamp
    },
};

export default {
    state,
    mutations,
    actions,
    getters
};