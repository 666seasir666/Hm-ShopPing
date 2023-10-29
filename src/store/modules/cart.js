// 导入来自 '@/api/cart' 模块的 getCartList 函数
import { getCartList, changeCount, delSelect } from '@/api/cart'

import { Toast } from 'vant'// 导入 Toast 组件

export default {
  namespaced: true,
  state () {
    return {
      cartList: []// 购物车列表数组
    }
  },
  mutations: {
    // Mutation 用于设置购物车列表数据
    setCartList (state, newList) {
      // 将购物车列表状态（state.cartList）设置为新的列表数据（newList）
      state.cartList = newList
    },
    toggleCheck (state, goodsId) {
      // 让对应的ID项取反。通过在购物车列表中查找指定 goods_id 的商品
      const goods = state.cartList.find(item => item.goods_id === goodsId)

      // 切换商品的选中状态（isChecked 属性）
      goods.isChecked = !goods.isChecked
    },
    // 切换购物车中所有商品的选中状态
    toggleAllCheck (state, flag) {
    // 遍历购物车列表中的每个商品，将它们的选中状态设置为指定的 flag 值
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    // Mutation 用于更新购物车中特定商品的数量
    changeCount (state, { goodsId, goodsNum }) {
      // 通过 goodsId 找到购物车中对应的商品对象
      const goods = state.cartList.find(item => item.goods_id === goodsId)

      // 更新商品对象的数量为传递的新数量值 goodsNum
      goods.goods_num = goodsNum
    }

  },
  actions: {
    // Action 用于异步获取购物车数据，并标记所有项目为已选
    async getCartAction (context) {
      const { data } = await getCartList()

      // 标记所有项目为已选
      data.list.forEach(item => {
        item.isChecked = true
      })

      // 提交数据到 mutation 来更新购物车列表
      context.commit('setCartList', data.list)
    },
    // Action 用于修改购物车中特定商品的数量
    async changeCountAction (context, obj) {
      // 从传递的对象中解构出 goodsId, value 和 skuId
      const { goodsNum, goodsId, goodsSkuId } = obj

      // 通过提交 mutation 来更新购物车中特定商品的数量
      context.commit('changeCount', {
        goodsId,
        goodsNum
      })

      // 调用 changeCount 函数向服务器发送请求，更新购物车的数量
      await changeCount(goodsId, goodsNum, goodsSkuId)
    },
    // 删除购物车数据
    async delSelect (context) {
      // 从 Vuex store 的 getters 中获取已选择的购物车列表
      const selCartList = context.getters.selCartList
      // 提取已选择购物车列表中的 id 属性，以便进行删除操作
      const cartIds = selCartList.map(item => item.id)
      // 调用删除函数，传入已选择的购物车项的 id 列表
      delSelect(cartIds)
      // 弹出成功提示信息
      Toast('删除成功')

      // 重新拉去最新购物车的数据-重新渲染
      context.dispatch('getCartAction')
    }

  },
  getters: {
    // 在这里可以定义购物车数据的 getter 函数，以供组件使用

    // 计算购物车中所有商品的总数量
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 获取购物车中已选中的商品列表
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 计算已选中商品的总数量
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 计算已选中商品的总价格，保留两位小数
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => {
        return (sum + item.goods_num * item.goods.goods_price_min)
      }, 0).toFixed(2)
    },
    // 检查是否购物车中的所有商品都全选
    isAllChecked (state) {
    // 使用 Array 的 every 方法检查购物车列表中的每个商品是否都已选中
      return state.cartList.every(item => item.isChecked)
    }

  }
}
