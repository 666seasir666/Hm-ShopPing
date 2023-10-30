<!--
  功能：初始化功能描述
  作者：Hou
  邮箱：2429016980@qq.com
  时间：2023年10月06日 04:20:34
  版本：v1.0
  修改内容：vue2.0初始化模板
  修改人员：Hou
  修改时间：2023年10月06日 04:20:34
-->
<template>
  <div>
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <van-tabbar route active-color="#ee0a24" inactive-color="#000">
    <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/category" icon="apps-o">分类页</van-tabbar-item>
    <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
  </div>
</template>
<script>
// import(导入)其他文件（如：组件，工具js，第三方插件js，json文件，图片文件等）

export default {
  /** 注册组件 */
  components: {},
  /** 接受父组件传值 */
  props: {},
  name: 'layouIndex',
  data () {
    return {

    }
  },
  /** 计算属性 */
  computed: {},
  /** 监听data数据变化 */
  watch: {},
  /** 所有方法 */
  methods: {

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
</style>
