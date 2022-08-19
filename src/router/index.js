//配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//解决重复访问路由地址报错
let originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, resolve, reject) {
    if (resolve && reject) {
        originalPush.call(this, location, resolve, reject);
    } else {
        originalPush.call(this, location, () => { }, () => { });
    }
    //return originalPush.call(this, location).catch(err => err)
};

export default new VueRouter({
    // mode:history,
    routes: [
        {
            path: "/",   //默认
            redirect: "/login",
        }
        ,
        {
            path: "/home",  //需求：若访问home页面时不带参数，分两个情况：1)已登录(jwt有记录)，则自动跳转到登录用户的id页面 2）未登录，自动跳转到login界面
            component: () => import('@/pages/Home'),
            // 挂载路由导航守卫
            beforeEnter: (to, from, next) => {
                const isLogin = localStorage.getItem('TOKEN')
                if (!isLogin) {
                    alert('请先登录')
                    return next('/login')
                }
                else {
                    next()
                }
                next()
            },
            children: [
                {
                    path: 'blog_list',
                    component: () => import('@/pages/Blog_List'),
                },
                {
                    path: 'publish',
                    component: () => import('@/pages/Publish'),
                },
                {
                    path: 'blog_detail/:blog_id',
                    name: 'Detail',
                    component: () => import('@/pages/Blog_Detail'),
                },
            ]
        }
        ,
        {
            path: "/login",
            component: () => import('@/pages/Login'),
        }
        ,
        {
            path: "/space",   //嵌套路由示例
            component: () => import('@/pages/Space'),
            // 挂载路由导航守卫
            beforeEnter: (to, from, next) => {
                const isLogin = localStorage.getItem('TOKEN')
                if (!isLogin) {
                    alert('请先登录')
                    return next('/login')
                }
                else {
                    next()
                }
                next()
            },
            children: [
                {
                    // path: '/space/subModule1',
                    path: 'submodule1',
                    component: () => import('@/pages/Space/subModule1'),
                },
                {
                    // path: '/space/subModule2',
                    path: 'submodule2',
                    component: () => import('@/pages/Space/subModule2'),
                },
            ],
        },
        {
            path: "/:path(.*)",   //404，当无法匹配其他路由时选择该页面
            component: () => import('@/pages/404.vue'),
        }
    ]
})