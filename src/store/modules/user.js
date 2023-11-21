
import { getInfo, setInfo } from '@/utils/storage'

const state = {
  // 存储用户信息的状态对象，包括 token 和 userId
  userInfo: getInfo() // 刷新后数据丢失，初始化 vuex，从本地读取初始化用户信息数据
}

const mutations = {
  // 将传入的用户信息对象存储到状态对象的 userInfo 属性中
  setUserInfo (state, obj) {
    state.userInfo = obj
    // 调用 setInfo 函数将用户信息存储到 localStorage
    setInfo(obj)
  }
}

const actions = {
  // 用户注销 action
  logout (context) {
    // 提交 mutation，将用户信息设置为空对象
    context.commit('setUserInfo', {})

    // 提交 mutation，清空购物车列表（使用 root: true 表示在根模块中调用 cart 模块的 mutation）
    context.commit('cart/setCartList', [], { root: true })
  }
}

const getters = {
  // 用于从状态中派生计算属性的一种方式
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
