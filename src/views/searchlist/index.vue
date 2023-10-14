<!--
  功能：初始化功能描述
  作者：Hou
  邮箱：2429016980@qq.com
  时间：2023年10月06日 04:35:21
  版本：v1.0
  修改内容：vue2.0初始化模板
  修改人员：Hou
  修改时间：2023年10月06日 04:35:21
-->
<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="querySearch || '搜索商品'"
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div class="sort-item">综合</div>
      <div class="sort-item">销量</div>
      <div class="sort-item">价格 </div>
    </div>

    <div class="goods-list">
      <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getProList } from '@/api/product'
// import(导入)其他文件（如：组件，工具js，第三方插件js，json文件，图片文件等）

export default {
  /** 注册组件 */
  components: {
    GoodsItem
  },
  /** 接受父组件传值 */
  props: {},
  name: 'SearchIndex',
  data () {
    return {
      page: 1, // 页码
      proList: []// 搜索后商品列表
    }
  },
  /** 计算属性 */
  computed: {
    // 获取地址栏搜索关键字
    querySearch () {
      return this.$route.query.search// 访问当前路由的 search 查询参数
    }
  },
  /** 监听data数据变化 */
  watch: {},
  /** 所有方法 */
  methods: {

  },
  /** 创建组件时执行(有VM对象this) */
  async created () {
  // 通过 getProList 函数获取商品列表数据
    const { data: { list } } = await getProList({
      categoryId: this.$route.query.categoryId, // 使用路由的查询参数作为商品分类ID
      goodsName: this.querySearch, // 使用当前组件的 querySearch 方法获取搜索关键词
      page: this.page // 使用当前组件的 page 属性作为页数
    })
    // 将获取到的商品列表数据存储在组件的 proList 属性中
    this.proList = list.data
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
.search {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
