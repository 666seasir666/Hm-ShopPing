// 导入Vue和Vuex库
import Vue from 'vue'
import Vuex from 'vuex'

// 导入"store/modules/user.js"的模块
import user from './modules/user'

// 导入"store/modules/cart.js"的模块
import cart from './modules/cart'
// 使用Vuex插件
Vue.use(Vuex)

// 创建并导出Vuex store实例
export default new Vuex.Store({
  state: {
    // 在这里定义你的全局状态
  },
  getters: {
    // 在这里定义你的全局getter函数
    token (state) {
      // 获取用户token令牌
      return state.user.userInfo.token
    }
  },
  mutations: {
    // 在这里定义你的全局mutation函数
  },
  actions: {
    // 在这里定义你的全局action函数
  },
  modules: {
    user, // 导入并注册名为'user'的模块
    cart // 导入并注册名为'cart'的模块
  }
})
