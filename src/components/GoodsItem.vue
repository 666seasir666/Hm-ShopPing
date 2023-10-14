<!--
  功能：初始化功能描述
  作者：Hou
  邮箱：2429016980@qq.com
  时间：2023年10月12日 01:40:51
  版本：v1.0
  修改内容：vue2.0初始化模板
  修改人员：Hou
  修改时间：2023年10月12日 01:40:51
-->
<template>
  <div v-if="item.goods_name" class="goods-item" @click="$router.push('/prodetail')">
    <div class="left">
      <img :src="item.goods_image" alt="" />
    </div>
    <div class="right">
      <p class="tit text-ellipsis-2">
        {{ item.goods_name }}
      </p>
      <p class="count">已售{{ item.goods_sales }}件</p>
      <p class="price">
        <span class="new">¥{{ item.goods_price_min }}</span>
        <span class="old">¥{{ item.goods_price_max }}</span>
      </p>
    </div>
  </div>
</template>

<script>
// import(导入)其他文件（如：组件，工具js，第三方插件js，json文件，图片文件等）

export default {
  /** 注册组件 */
  components: {},
  /** 接受父组件传值 */
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'GoodsItem',
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
.goods-item {
  height: 148px;
  margin-bottom: 6px;
  padding: 10px;
  background-color: #fff;
  display: flex;
  .left {
    width: 127px;
    img {
      display: block;
      width: 100%;
    }
  }
  .right {
    flex: 1;
    font-size: 14px;
    line-height: 1.3;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .count {
      color: #999;
      font-size: 12px;
    }
    .price {
      color: #999;
      font-size: 16px;
      .new {
        color: #f03c3c;
        margin-right: 10px;
      }
      .old {
        text-decoration: line-through;
        font-size: 12px;
      }
    }
  }
}
</style>
