<!--
  功能：初始化功能描述
  作者：Hou
  邮箱：2429016980@qq.com
  时间：2023年10月06日 04:22:41
  版本：v1.0
  修改内容：vue2.0初始化模板
  修改人员：Hou
  修改时间：2023年10月06日 04:22:41
-->
<template>
  <div class="order">
    <van-nav-bar title="我的订单" left-arrow @click-left="$router.go(-1)" />
    <van-tabs v-model="active">
      <van-tab title="全部"></van-tab>
      <van-tab title="待支付"></van-tab>
      <van-tab title="待发货"></van-tab>
      <van-tab title="待收货"></van-tab>
      <van-tab title="待评价"></van-tab>
    </van-tabs>

    <OrderListItem v-for="item in list" :key="item.order_id" :item="item"></OrderListItem>
  </div>
</template>
<script>
// import(导入)其他文件（如：组件，工具js，第三方插件js，json文件，图片文件等）
// 引入名为 OrderListItem 的组件
import OrderListItem from '@/components/OrderListItem.vue'

// 引入获取我的订单列表的API方法
import { getMyOrderList } from '@/api/order'

export default {
  /** 注册组件 */
  components: {
    OrderListItem
  },
  /** 接受父组件传值 */
  props: {},
  name: 'OrderPage',
  data () {
    return {
      // 当前选中的订单类型，从路由参数中获取，如果不存在则默认为 'all'
      active: this.$route.query.dataType || 'all',
      page: 1, // 当前页码，默认为第一页
      list: []// 当前页码，默认为第一页
    }
  },
  /** 计算属性 */
  computed: {},
  /** 监听data数据变化 */
  watch: {
  // 监听 'active' 属性的变化
    active: {
    // 立即执行一次 'handler' 函数
      immediate: true,
      // 处理函数，当 'active' 属性变化时调用
      handler () {
      // 调用 getOrderList 方法刷新订单列表
        this.getOrderList()
      }
    }
  },

  /** 所有方法 */
  methods: {
  // 异步方法，用于获取我的订单列表
    async getOrderList () {
    // 调用API，获取我的订单列表数据
      const { data: { list } } = await getMyOrderList(this.active, this.page)

      // 遍历订单列表，计算每个订单的商品总数量
      list.data.forEach((item) => {
        item.total_num = 0
        item.goods.forEach(goods => {
          item.total_num += goods.total_num
        })
      })

      // 更新组件中的订单列表数据
      this.list = list.data
    }
  },

  /** 创建组件时执行(有VM对象this) */
  created () {

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
.order {
  background-color: #fafafa;
}
.van-tabs {
  position: sticky;
  top: 0;
}
</style>
