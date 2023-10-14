<!--
  功能：初始化功能描述
  作者：Hou
  邮箱：2429016980@qq.com
  时间：2023年10月06日 04:24:26
  版本：v1.0
  修改内容：vue2.0初始化模板
  修改人员：Hou
  修改时间：2023年10月06日 04:24:26
-->
<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <van-search v-model="search" show-action placeholder="请输入搜索关键词" clearable>
      <template #action>
        <div @click="goSearch(search)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history" v-if="history.length > 0">
      <div class="title">
        <span>最近搜索</span>
        <van-icon name="delete-o" size="16" />
      </div>
      <div class="list">
        <div v-for="item in history" :key="item" class="list-item" @click="$router.push('/searchlist')">{{item}}</div>
      </div>
    </div>
  </div>
</template>
<script>
// import(导入)其他文件（如：组件，工具js，第三方插件js，json文件，图片文件等）

export default {
  /** 注册组件 */
  components: {},
  /** 接受父组件传值 */
  props: {},
  name: 'SearchIndex',
  data () {
    return {
      search: '',
      history: ['手机', '空调', '白酒', '电视', '相机', '风扇', '茅台', '平板']
    }
  },
  /** 计算属性 */
  computed: {},
  /** 监听data数据变化 */
  watch: {},
  /** 所有方法 */
  methods: {
    goSearch (key) {
      // console.log('这叼毛用户进行了搜索', key)
      const index = this.history.indexOf(key)
      if (index !== -1) {
        this.history.splice(index, 1)
      }
      this.history.unshift(key)
      this.$router.push(`/searchlist?search=${key}`)
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
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
