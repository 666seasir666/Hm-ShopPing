import Vue from 'vue'
import VueRouter from 'vue-router'
// 以下是一级路由配置
import Layou from '@/views/layou'// 一级路由首页
import Login from '@/views/login'// 登录
import Myorder from '@/views/myorder'
import Pay from '@/views/pay'// 支付
import Prodetail from '@/views/prodetail'// 商品详情
import Search from '@/views/search'// 搜索
import SearchList from '@/views/searchlist'// 搜索列表

// 以下是二级路由配置
import Home from '@/views/layou/home' // 二级路由首页
import Category from '@/views/layou/category'// 分类页
import Cart from '@/views/layou/cart'// 购物车
import User from '@/views/layou/user' // 我的
import store from '@/store'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layou,
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
    { path: '/login', component: Login },
    { path: '/myorder', component: Myorder },
    // 动态路由传参,确认将来是哪个商品。路由参数中需要携带ID
    { path: '/pay', component: Pay },
    { path: '/prodetail/:id', component: Prodetail },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList }
  ]
})

// 1. to往哪里去， 到哪去的路由信息对象
// 2. from 从哪里来， 从哪来的路由信息对象
// 3. next() 是否放行
// 如果next()调用，就是放行
// next(路径) 拦截到某个路径页面

// 定义一个数组，专门用户存放所有需要权限访问的页面
const authUrl = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  // 获取用户令牌
  const token = store.getters.token

  // 如果目标路由不在需要认证的路由列表中，直接放行
  if (!authUrl.includes(to.path)) {
    next()
    return
  }

  // 如果用户已登录（有令牌），则放行
  if (token) {
    next()
  } else {
    // 如果用户未登录，重定向到登录页面
    next('/login')
  }
})

export default router
