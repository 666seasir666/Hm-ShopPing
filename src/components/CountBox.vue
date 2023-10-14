<!--
  功能：加入购物车-数字框基本封装
  作者：Hou
  邮箱：2429016980@qq.com
  时间：2023年10月14日 23:52:13
  版本：v1.0
  修改内容：vue2.0初始化模板
  修改人员：Hou
  修改时间：2023年10月14日 23:52:13
-->
<template>
  <div class="count-box">
    <button @click="handleSub" class="minus">-</button>
    <input :value="value" @change="handleChange" class="inp" type="text">
    <button @click="handleAdd" class="add">+</button>
  </div>
</template>
<script>
// import(导入)其他文件（如：组件，工具js，第三方插件js，json文件，图片文件等）

export default {
  /** 注册组件 */
  components: {},
  /** 接受父组件传值 */
  props: {
    value: {
      type: Number,
      default: 1// 默认值:1
    }
  },
  name: 'CountBox',
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
    // 减少数值
    handleSub () {
      // 如果值小于或等于1，不执行任何操作
      if (this.value <= 1) {
        return
      }
      // 通过 $emit 发送新的值给父组件
      this.$emit('input', this.value - 1)
    },

    // 增加数值
    handleAdd () {
      // 通过 $emit 发送新的值给父组件
      this.$emit('input', this.value + 1)
    },

    // 处理输入框内容改变事件
    handleChange (e) {
      // 尝试将输入值转换为数字，如果无法转换为数字或小于1，则恢复原来的值
      const num = +e.target.value

      // 输入了不合法的文本或输入了负值，回退成原来的 value 值
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        return
      }

      // 通过 $emit 发送新的值给父组件
      this.$emit('input', num)
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
.count-box {
  width: 110px;
  display: flex;
    .add, .minus,
    .inp{
    width: 30px;
    height: 18px;
    outline: none;
    border: none;
    background-color: #efefef;
  }

.inp {
  width: 40px;
  margin: 0 5px;
  text-align: center;
}
  .minus, .add{
    background: rgba(255, 0, 0, 0);
  }
}
</style>
