<!--
  功能：初始化功能描述
  作者：Hou
  邮箱：2429016980@qq.com
  时间：2023年11月18日 21:33:11
  版本：v1.0
  修改内容：vue2.0初始化模板
  修改人员：Hou
  修改时间：2023年11月18日 21:33:11
-->
<template>
  <div class="pay">
    <van-nav-bar
      fixed
      title="订单结算台"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <!-- 地址相关 -->
    <div class="address">
      <div class="left-icon">
        <van-icon name="logistics" />
      </div>

      <div class="info" v-if="selectAddress.address_id">
        <div class="info-content">
          <span class="name">{{ selectAddress.name }}</span>
          <span class="mobile">{{ selectAddress.phone }}</span>
        </div>
        <div class="info-address">{{ longAddress }}</div>
      </div>

      <div class="info" v-else>请选择配送地址</div>

      <div class="right-icon">
        <van-icon name="arrow" />
      </div>
    </div>

    <!-- 订单明细 -->
    <div class="pay-list" v-if="order.goodsList">
      <div class="list">
        <div class="goods-item" v-for="item in order.goodsList" :key="item.goods_id">
          <div class="left">
            <img :src="item.goods_image" alt="" />
          </div>
            <div class="right">
              <p class="tit text-ellipsis-2">
                {{ item.goods_name }}
              </p>
              <p class="info">
                <span class="count">x{{ item.total_num }}</span>
                <span class="price">¥{{ item.total_pay_price }}</span>
              </p>
            </div>
          </div>
      </div>

      <div class="flow-num-box">
          <span>共 {{ order.orderTotalNum }} 件商品，合计：</span>
          <span class="money">￥{{ order.orderTotalPrice }}</span>
      </div>

      <div class="pay-detail">
          <div class="pay-cell">
            <span>订单总金额：</span>
            <span class="red">￥{{ order.orderTotalPrice }}</span>
          </div>

          <div class="pay-cell">
            <span>优惠券：</span>
            <span>无优惠券可用</span>
          </div>

          <div class="pay-cell">
            <span>配送费用：</span>
            <span v-if="!selectAddress">请先选择配送地址</span>
            <span v-else class="red">+￥0.00</span>
          </div>
      </div>

    <!-- 支付方式 -->
      <div class="pay-way">
          <span class="tit">支付方式</span>
          <div class="pay-cell">
            <span><van-icon name="balance-o" />余额支付（可用 ¥ {{ personal.balance }} 元）</span>
            <!-- <span>请先选择配送地址</span> -->
            <span class="red"><van-icon name="passed" /></span>
          </div>
      </div>

    <!-- 买家留言 -->
      <div class="buytips">
        <textarea v-model="remark" placeholder="选填：买家留言（50字内）" name="" id="" cols="30" rows="10"></textarea>
      </div>
    </div>

    <!-- 底部提交 -->
    <div class="footer-fixed">
      <div class="left">实付款：<span>￥{{ order.orderTotalPrice }}</span></div>
      <div class="tipsbtn" @click="submitOrder">提交订单</div>
    </div>
  </div>
</template>
<script>
// import(导入)其他文件（如：组件，工具js，第三方插件js，json文件，图片文件等）
import { getAddressList } from '@/api/address'
import { checkOrder, submitOrder } from '@/api/order'
import loginConfirm from '@/mixins/loginConfirm'
export default {
  /** 注册组件 */
  components: {},
  /** 接受父组件传值 */
  props: {},
  name: 'PayIndex',
  mixins: [loginConfirm],
  data () {
    return {
      addressList: [], // 初始化地址列表为空数组
      order: {}, // 订单对象，初始为空对象
      personal: {}, // 个人信息对象，初始为空对象
      remark: ''// 备注留言
    }
  },
  /** 计算属性 */
  computed: {
    selectAddress () {
    // 返回地址列表中的第一个地址，如果地址列表为空，则返回一个空对象
      return this.addressList[0] || {}
    },

    longAddress () {
    // 获取选择的地址的区域信息
      const region = this.selectAddress.region
      // 拼接并返回完整的地址，包括省、市、区以及详细地址
      return region.province + region.city + region.region + this.selectAddress.detail
    },

    mode () {
    // 获取当前路由中的查询参数中的 mode 值
      return this.$route.query.mode
    },

    cartIds () {
    // 获取当前路由中的查询参数中的 cartIds 值
      return this.$route.query.cartIds
    },

    goodsId () {
      return this.$route.query.goodsId
    },
    goodsSkuId () {
      return this.$route.query.goodsSkuId
    },
    goodsNum () {
      return this.$route.query.goodsNum
    }

  },
  /** 监听data数据变化 */
  watch: {},
  /** 所有方法 */
  methods: {
    async getAddressList () {
    // 调用异步函数 getAddressList() 获取地址列表数据
      const { data: { list } } = await getAddressList()
      // 将获取到的地址列表赋值给组件的 getAddressList 属性
      this.addressList = list
    },

    async getOrderList () {
    // 检查当前模式是否为 'cart'
      if (this.mode === 'cart') {
        // 调用异步函数 checkOrder() 检查订单，传入当前模式和购物车标识符
        const { data: { order, personal } } = await checkOrder(this.mode, {
          cartIds: this.cartIds
        })
        // 将获取到的订单数据和个人信息数据赋值给组件的 order 和 personal 属性
        this.order = order
        this.personal = personal
      }

      if (this.mode === 'buyNow') {
        const { data: { order, personal } } = await checkOrder(this.mode, {
          goodsId: this.goodsId,
          goodsSkuId: this.goodsSkuId,
          goodsNum: this.goodsNum
        })
        this.order = order
        this.personal = personal
      }
    },

    // 提交订单
    async submitOrder () {
      // 如果当前模式是 'cart'，表示是从购物车提交订单
      if (this.mode === 'cart') {
        // 调用API提交购物车订单
        await submitOrder(this.mode, {
          cartIds: this.cartIds, // 传递购物车商品ID列表
          remark: this.remark // 传递订单备注信息
        })
      }

      // 如果当前模式是 'buyNow'，表示是立即购买提交订单
      if (this.mode === 'buyNow') {
        // 调用API提交立即购买订单
        await submitOrder(this.mode, {
          goodsId: this.goodsId, // 传递商品ID
          goodsSkuId: this.goodsSkuId, // 传递商品SKU ID
          goodsNum: this.goodsNum, // 传递商品数量
          remark: this.remark // 传递订单备注信息
        })
      }

      // 提示支付成功
      this.$toast.success('支付成功')

      // 跳转到我的订单页面
      this.$router.replace('/myorder')
    }
  },
  /** 创建组件时执行(有VM对象this) */
  created () {
    // 调用获取地址列表的方法
    this.getAddressList()

    // 调用获取订单列表的方法
    this.getOrderList()
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
<style scoped lang="less">
/* @import url(); 引入css类 */
.pay {
  padding-top: 46px;
  padding-bottom: 46px;
  ::v-deep {
    .van-nav-bar__arrow {
      color: #333;
    }
  }
}
.address {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  font-size: 14px;
  color: #666;
  position: relative;
  background: url(@/assets/border-line.png) bottom repeat-x;
  background-size: 60px auto;
  .left-icon {
    margin-right: 20px;
  }
  .right-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-7px);
  }
}
.goods-item {
  height: 100px;
  margin-bottom: 6px;
  padding: 10px;
  background-color: #fff;
  display: flex;
  .left {
    width: 100px;
    img {
      display: block;
      width: 80px;
      margin: 10px auto;
    }
  }
  .right {
    flex: 1;
    font-size: 14px;
    line-height: 1.3;
    padding: 10px;
    padding-right: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: #333;
    .info {
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      .price {
        color: #fa2209;
      }
    }
  }
}

.flow-num-box {
  display: flex;
  justify-content: flex-end;
  padding: 10px 10px;
  font-size: 14px;
  border-bottom: 1px solid #efefef;
  .money {
    color: #fa2209;
  }
}

.pay-cell {
  font-size: 14px;
  padding: 10px 12px;
  color: #333;
  display: flex;
  justify-content: space-between;
  .red {
    color: #fa2209;
  }
}
.pay-detail {
  border-bottom: 1px solid #efefef;
}

.pay-way {
  font-size: 14px;
  padding: 10px 12px;
  border-bottom: 1px solid #efefef;
  color: #333;
  .tit {
    line-height: 30px;
  }
  .pay-cell {
    padding: 10px 0;
  }
  .van-icon {
    font-size: 20px;
    margin-right: 5px;
  }
}

.buytips {
  display: block;
  textarea {
    display: block;
    width: 100%;
    border: none;
    font-size: 14px;
    padding: 12px;
    height: 100px;
  }
}

.footer-fixed {
  position: fixed;
  background-color: #fff;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 46px;
  line-height: 46px;
  border-top: 1px solid #efefef;
  font-size: 14px;
  display: flex;
  .left {
    flex: 1;
    padding-left: 12px;
    color: #666;
    span {
      color: #fa2209;
    }
  }
  .tipsbtn {
    width: 121px;
    background: linear-gradient(90deg, #f9211c, #ff6335);
    color: #fff;
    text-align: center;
    line-height: 46px;
    display: block;
    font-size: 14px;
  }
}
</style>
