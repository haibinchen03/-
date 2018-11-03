import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'  //登录页
import Detail from '@/views/Detail.vue'//详情页
import Home from '@/views/Home.vue'  //主页
import Search from '@/views/Search.vue' //搜索页
import Lister from '@/views/Lister.vue'//类别列表页
import Personal from '@/views/Personal.vue' //我的页面
import SetUp from '@/views/SetUp.vue' //修改页面
Vue.use(Router);

export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import(/* webpackChunkName: "about" */ './views/Home.vue')  //主页
        },
        {
            path: '/setUp',
            name: 'SetUp',
            component: () => import(/* webpackChunkName: "about" */ './views/SetUp.vue')  //修改个人中心
        },
        {
            path: '/personal',
            name: 'Personal',
            component: () => import(/* webpackChunkName: "about" */ './views/Personal.vue')  //个人中心页面
        },
        {
            path: '/lister',
            name: 'Lister',
            component: () => import(/* webpackChunkName: "about" */ './views/Lister.vue')  //类别列表页
        },
        {
            path: '/search',
            name: 'Search',
            component: () => import(/* webpackChunkName: "about" */ './views/Search.vue')  //搜索页
        },

        {
            path: '/detail',
            name: 'Detail',
            component: () => import(/* webpackChunkName: "about" */ './views/Detail.vue')//详情页
        },

        {
            path: '/login',
            name: 'Login',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/Login.vue') //登录页
        }
    ]
})
