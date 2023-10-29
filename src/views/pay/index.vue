<!--
  功能：初始化功能描述
  作者：Hou
  邮箱：2429016980@qq.com
  时间：2023年10月06日 04:23:26
  版本：v1.0
  修改内容：vue2.0初始化模板
  修改人员：Hou
  修改时间：2023年10月06日 04:23:26
-->
<template>
  <div class="pay">
    <van-nav-bar fixed title="订单结算台" left-arrow @click-left="$router.go(-1)" />

    <!-- 地址相关 -->
    <div class="address">

      <div class="left-icon">
        <van-icon name="logistics" />
      </div>

      <div class="info" v-if="selectedAddress.address_id">
        <div class="info-content">
          <span class="name">{{ selectedAddress.name }}</span>
          <span class="mobile">{{ selectedAddress.phone }}</span>
        </div>
        <div class="info-address">
          {{selectedAddress.region.province}}
          {{selectedAddress.region.city}}
          {{selectedAddress.region.region}}
          <!-- {{longAddress}} -->
        </div>
      </div>

      <div class="info" v-else>
        请选择配送地址
      </div>

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
          <span v-if="!selectedAddress">请先选择配送地址</span>
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
        <textarea placeholder="选填：买家留言（50字内）" name="" id="" cols="30" rows="10"></textarea>
      </div>
    </div>

    <!-- 底部提交 -->
    <div class="footer-fixed">
      <div class="left">实付款：<span>￥{{ order.orderTotalPrice }}</span></div>
      <div class="tipsbtn">提交订单</div>
    </div>
  </div>
</template>

<script>
// import(导入)其他文件（如：组件，工具js，第三方插件js，json文件，图片文件等）

// 导入名为 收获地址 的函数，用于收获地址相关操作  这个函数通常从 @/api/address 模块中导入
import { getAddressList } from '@/api/address'

// 导入名为 订单结算 的函数，用于订单相关操作  这个函数通常从 @/api/order 模块中导入
import { checkOrder } from '@/api/order'
export default {
  /** 注册组件 */
  components: {},
  /** 接受父组件传值 */
  props: {},
  name: 'PayIndex',
  data () {
    return {
      addressList: [], // 收获地址列表
      order: {},
      personal: {}
    }
  },
  /** 计算属性 */
  computed: {
    // 选择收获地址
    selectedAddress () {
      //  如果地址列表非空，返回第一个地址；否则，返回一个空对象
      return this.addressList[0] || {}
    },

    // 长地址
    // longAddress () {
    //   const region = this.selectAddress.region
    //   return region.province + region.city + region.region + this.selectAddress.detail
    // }

    mode () {
      // 从当前路由的查询参数中获取 'mode' 值
      return this.$route.query.mode
    },
    cartIds () {
      // 从当前路由的查询参数中获取 'cartIds' 值
      return this.$route.query.cartIds
    }
  },
  /** 监听data数据变化 */
  watch: {},
  /** 所有方法 */
  methods: {

    // 从服务器获取地址列表，并将列表数据存储到组件的 addressList 属性中
    async getAddressList () {
      // 调用 getAddressList() 函数，它返回一个包含地址列表的数据对象
      const { data: { list } } = await getAddressList()

      // 将获取到的地址列表数据存储到组件的 addressList 属性中
      this.addressList = list
    },

    async getOrderList () {
      if (this.mode === 'cart') {
        const { data: { order, personal } } = await checkOrder(this.mode, { cartIds: this.cartIds })
        this.order = order
        this.personal = personal
      }
    },
    /** 创建组件时执行(有VM对象this) */
    created () {
      this.getAddressList()
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
}
</script>

<style scoped lang='less'>
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
      color:#fa2209;
    }
  }
  .tipsbtn {
    width: 121px;
    background: linear-gradient(90deg,#f9211c,#ff6335);
    color: #fff;
    text-align: center;
    line-height: 46px;
    display: block;
    font-size: 14px;
  }
}
</style>
