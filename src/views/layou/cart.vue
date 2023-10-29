<!--
  功能：初始化功能描述
  作者：Hou
  邮箱：2429016980@qq.com
  时间：2023年10月06日 04:54:58
  版本：v1.0
  修改内容：vue2.0初始化模板
  修改人员：Hou
  修改时间：2023年10月06日 04:54:58
-->
<template>
  <div class="cart">
    <van-nav-bar title="购物车" fixed />
    <!-- 如果用户已登录且购物车列表中有至少一个购物车项，那么渲染这个元素
    通常用于在用户登录后，且购物车不为空的情况下显示相关内容
    如果其中任何一个条件不满足，该元素将不会被渲染或显示 -->
      <div v-if="isLogin && cartList.lenght > 0">
      <!-- 购物车开头 -->
      <div class="cart-title">
        <span class="all">共<i>{{cartTotal}}</i>件商品</span>
        <!-- 使用@click指令，点击事件触发时切换编辑状态 -->
        <span class="edit" @click="isEdit = !isEdit">
          <van-icon name="edit" />
          编辑
        </span>
      </div>

      <!-- 购物车列表 -->
      <div class="cart-list">
        <div class="cart-item" v-for="item in cartList" :key="item.goods_id">
          <van-checkbox icon-size="18" :value="item.isChecked" @click="toggleCheck(item.goods_id)" ></van-checkbox>
          <div class="show">
            <img :src="item.goods.goods_image" alt="">
          </div>
          <div class="info">
            <span class="tit text-ellipsis-2">{{ item.goods.goods_name }}</span>
            <span class="bottom">
              <div class="price">¥ <span>{{ item.goods.goods_price_min }}</span></div>
              <!-- 既希望保留原本的形参，又需要通过调用函数传参 => 箭头函数包装一层 -->
              <CountBox :value="item.goods_num" @input="value => changeCount(value, item.goods_id, item.goods_sku_id)"></CountBox>
              <!-- <div class="count-box">
                <button class="minus">-</button>
                <input class="inp" :value="40" type="text" readonly>
                <button class="add">+</button>
              </div> -->
            </span>
          </div>
        </div>
      </div>

      <!-- 购物车底部 -->
      <div class="footer-fixed">
        <div @click="toggleAllCheck" class="all-check">
          <van-checkbox  icon-size="18" :value="isAllChecked"></van-checkbox>
          全选
        </div>

        <div class="all-total">
          <div class="price">
            <span>合计：</span>
            <span>¥ <i class="totalPrice">{{selPrice}}</i></span>
          </div>
          <div v-if="!isEdit" class="goPay" :class="{ disabled: selCount === 0}" @click="goPay">结算({{selCount}})</div>
          <div v-else @click="handleDel" class="delete" :class="{ disabled: selCount === 0}">删除</div>
        </div>
      </div>
    </div>

    <!-- 购物车为空 -->
    <div class="empty-cart" v-else>
      <img src="@/assets/empty.png" alt="#">
      <div class="tips">
        您的购物车是空的，快去逛逛吧！
      </div>
      <div class="btn" @click="$router.push('/')">去逛逛</div>
    </div>
  </div>
</template>

<script>
// import(导入)其他文件（如：组件，工具js，第三方插件js，json文件，图片文件等）
import CountBox from '@/components/CountBox.vue'
// 导入 Vuex 中的 mapState 辅助函数，用于将组件的局部状态映射到组件的计算属性
import { mapState, mapGetters } from 'vuex'

export default {
  /** 注册组件 */
  components: { CountBox },
  /** 接受父组件传值 */
  props: {},
  name: 'CartPage',
  data () {
    return {
      isEdit: false// 购物车默认不编辑状态
    }
  },
  /** 计算属性 */
  computed: {
    // 使用 mapState 辅助函数将 Vuex 模块 'cart' 中的 'cartList' 映射到当前组件的计算属性
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', ['cartTotal', 'selCartList', 'selCount', 'selPrice', 'isAllChecked']),
    isLogin () {
      // 从 Vuex 存储中获取 'token' getter 的值。
      // 如果 token 存在且为真值，表示用户已登录。
      // 如果 token 为假值（例如 null 或 undefined），表示用户未登录。
      return this.$store.getters.token
    }
  },
  /** 监听data数据变化 */
  watch: {
    // 定义一个名为 "isEdit" 的计算属性或观察者函数
    isEdit (value) {
      // 检查 "value" 参数，如果为真（true），执行以下操作
      if (value) {
        // 调用 Vuex store 中的 "cart/toggleAllCheck" mutation，并传递参数为 false
        this.$store.commit('cart/toggleAllCheck', false)
        // 通常用于取消选择所有复选框
      } else {
        // 如果 "value" 不为真（false），则执行以下操作
        // 再次调用 Vuex store 中的 "cart/toggleAllCheck" mutation，传递参数为 true
        this.$store.commit('cart/toggleAllCheck', true)
        // 通常用于选择所有复选框
      }
    }

  },
  /** 所有方法 */
  methods: {
    // 切换指定商品的选中状态
    toggleCheck (goodsId) {
      // 通过提交 'cart/toggleCheck' mutation 来切换商品的选中状态
      this.$store.commit('cart/toggleCheck', goodsId)
    },
    // 切换购物车中所有商品的选中状态
    toggleAllCheck () {
      // 通过提交 'cart/toggleAllCheck' mutation 来切换购物车中所有商品的选中状态
      this.$store.commit('cart/toggleAllCheck', !this.isAllChecked)
    },
    // 修改购物车中特定商品的数量
    changeCount (goodsNum, goodsId, goodsSkuId) {
      // 通过提交 'cart/changeCountAction' mutation 来修改指定商品的数量
      this.$store.dispatch('cart/changeCountAction', {
        goodsNum, // 商品id
        goodsId, // 商品数量
        goodsSkuId // 商品SKU, 默认值：0
      })
    },
    // 删除购物车列表数据
    async handleDel () {
      // 如果当前选中的购物车数量为零，则无需执行后续操作，直接返回
      if (this.selCount === 0) return

      // 通过 Vuex 的 store 分发一个名为 'cart/delSelect' 的 action，用于删除选中的购物车项
      await this.$store.dispatch('cart/delSelect')

      // 设置编辑状态为 false，可能用于退出编辑模式或重置界面状态
      this.isEdit = false
    },
    // 去结算
    goPay () {
      if (this.selCount > 0) {
        // 检查是否已选择了一项或多项
        // 如果 selCount 大于 0，表示有选中的购物车项
        this.$router.push({
          // 使用 Vue Router 的 $router 对象来导航到新的路由
          path: 'paly',
          // 导航到名为 'play' 的路由路径
          query: { // 向路由传递查询参数
            mode: 'cart', // 添加名为 'mode' 的参数，值为 'cart'
            cartIds: this.selCartList.map(item => item.id).join(',')
            // 添加名为 'cartIds' 的参数，值为已选中购物车项的 id 列表,使用逗号分隔
          }
        })
      }
    }
  },
  /** 创建组件时执行(有VM对象this) */
  created () {
    // 必须是登录过的用户，才能用购物车列表
    if (this.isLogin) {
      // 如果用户已登录，调用 cart 模块中的 getCartAction action
      this.$store.dispatch('cart/getCartAction')
    }
  },
  /** 加载完组件时执行(主要预处理数据) */
  mounted () {

  },
  beforeCreate () { /** 生命周期 - 创建之前 */ },
  beforeMount () { /** 生命周期 - 挂载之前 */ },
  beforeUpdate () { /** 生命周期 - 更新之前 */ },
  updated () { /** 生命周期 - 更新之后 */ },
  beforeDestroy () { /** 生命周期 - 销毁之前 */ },
  destroyed () { /** 生命周期 - 销毁完成 */ },
  activated () { /** keep-alive组件激活时调用。仅针对keep-alive组件有效 */ },
  deactivated () { /** keep-alive组件停用时调用。仅针对keep-alive组件有效 */ }
}
</script>

<style scoped lang='less'>
 /* @import url(); 引入css类 */
// 主题 padding
.cart {
  padding-top: 46px;
  padding-bottom: 100px;
  background-color: #f5f5f5;
  min-height: 100vh;
  .cart-title {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    .all {
      i {
        font-style: normal;
        margin: 0 2px;
        color: #fa2209;
        font-size: 16px;
      }
    }
    .edit {
      .van-icon {
        font-size: 18px;
      }
    }
  }

  .cart-item {
    margin: 0 10px 10px 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 5px;

    .show img {
      width: 100px;
      height: 100px;
    }
    .info {
      width: 210px;
      padding: 10px 5px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .bottom {
        display: flex;
        justify-content: space-between;
        .price {
          display: flex;
          align-items: flex-end;
          color: #fa2209;
          font-size: 12px;
          span {
            font-size: 16px;
          }
        }
        .count-box {
          display: flex;
          width: 110px;
          .add,
          .minus {
            width: 30px;
            height: 30px;
            outline: none;
            border: none;
          }
          .inp {
            width: 40px;
            height: 30px;
            outline: none;
            border: none;
            background-color: #efefef;
            text-align: center;
            margin: 0 5px;
          }
        }
      }
    }
  }
}

.footer-fixed {
  position: fixed;
  left: 0;
  bottom: 50px;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .all-check {
    display: flex;
    align-items: center;
    .van-checkbox {
      margin-right: 5px;
    }
  }

  .all-total {
    display: flex;
    line-height: 36px;
    .price {
      font-size: 14px;
      margin-right: 10px;
      .totalPrice {
        color: #fa2209;
        font-size: 18px;
        font-style: normal;
      }
    }

    .goPay, .delete {
      min-width: 100px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background-color: #fa2f21;
      color: #fff;
      border-radius: 18px;
      &.disabled {
        background-color: #ff9779;
      }
    }
  }

}

// 空购物车样式
.empty-cart {
  padding: 80px 30px;
  img {
    width: 140px;
    height: 92px;
    display: block;
    margin: 0 auto;
  }
  .tips {
    text-align: center;
    color: #666;
    margin: 30px;
  }
  .btn {
    width: 110px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #ee0a24;
    border-radius: 16px;
    color: #fff;
    display: block;
    margin: 0 auto;
  }
}
</style>
