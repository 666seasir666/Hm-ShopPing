// 导入utils/storage个人信息本地存储模块
import { getInfo, setInfo } from '@/utils/storage'

// 用户登录信息存入 vuex
export default {
  namespaced: true,
  state () {
    return {
      // 存储用户信息的状态对象，包括 token 和 userId
      userInfo: getInfo()// 刷新后数据丢失,初始化vuex,从本地读取初始化用户信息数据
    }
  },
  mutations: {
    // 在此处定义突变（如果有的话）。突变用于修改状态。

    setUserInfo (state, obj) {
      // mutation函数名：setUserInfo
      state.userInfo = obj
      // 参数：
      // - state：当前模块的状态对象
      // - obj：包含新用户信息的对象
      // 作用：将传入的用户信息对象（obj）存储到状态对象（state）的userInfo属性中

      setInfo(obj)// 调用setInfo函数将用户信息存储到localStorage
    }
  },
  actions: {
    // 在此处定义操作（如果有的话）。操作用于触发异步任务，然后提交一个或多个突变来修改状态。
  },
  getters: {
    // 用于从状态中派生计算属性的一种方式
  }
}
