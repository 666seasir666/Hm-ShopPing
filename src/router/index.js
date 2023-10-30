import Vue from 'vue'
import VueRouter from 'vue-router'
// 以下是一级路由配置
import Login from '@/views/login'// 登录
import Layout from '@/views/layout'// 一级路由首页
import Search from '@/views/search'// 搜索
import SearchList from '@/views/search/list'// 搜索列表
import ProDetail from '@/views/prodetail'// 商品详情
import Pay from '@/views/pay'// 支付
import MyOrder from '@/views/myorder'

// 以下是二级路由配置
import Home from '@/views/layout/home' // 二级路由首页
import Category from '@/views/layout/category'// 分类页
import Cart from '@/views/layout/cart'// 购物车
import User from '@/views/layout/user' // 我的

import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      // 当用户访问http://localhost:8080/#/重定向到首页
      redirect: '/home',
      // 二级路由配置
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }
      ]
    },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
    // 动态路由传参，确认将来是哪个商品，路由参数中携带 ID
    { path: '/prodetail/:id', component: ProDetail },
    { path: '/pay', component: Pay },
    { path: '/myorder', component: MyOrder }
  ]
})

// 1. to往哪里去， 到哪去的路由信息对象
// 2. from 从哪里来， 从哪来的路由信息对象
// 3. next() 是否放行
// 如果next()调用，就是放行
// next(路径) 拦截到某个路径页面

// 定义一个数组，专门用户存放所有需要权限访问的页面
const authUrls = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  // 如果目标路由不在需要认证的路由列表中，直接放行
  if (!authUrls.includes(to.path)) {
    next()
    return
  }

  // 是权限页面，需要判断token。如果用户已登录（有令牌），则放行
  const token = store.getters.token
  if (token) {
    next()
  } else {
    // 如果用户未登录，重定向到登录页面
    next('/login')
  }
})

export default router
