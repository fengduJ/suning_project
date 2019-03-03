import Vue from 'vue'
import Router from 'vue-router'

// 一级路由
import Login from '@/components/Login'
import Register from '@/components/Register'
import Index from '@/components/index/Index'
import Pagination from '@/components/pagination/Pagination'
import OrderDetail from '@/components/index/suning/OrderDetail'

//二级路由
import Suning from '@/components/index/suning/Suning'
import Kdcfdata from '@/components/index/Kdcfdata'
import Datashow from '@/components/index/Datashow'



Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Login', component: Login},
    { path: '/index', name: 'Index', component: Index,redirect:'/datashow',children:[
         //二级路由
         { path: '/datashow', name: 'Datashow', component: Datashow},
         { path: '/kdcfdata', name: 'Kdcfdata', component: Kdcfdata},
         { path: '/suning', name: 'Suning', component: Suning},
    ]},
    { path: '/register', name: 'Register', component: Register},
    { path: '/orderdetail', name: 'OrderDetail', component: OrderDetail},
     {path:'*',redirect:'/'},
    
   
  ],
   mode:'history'
})
