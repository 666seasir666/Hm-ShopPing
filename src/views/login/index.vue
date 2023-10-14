<!--
  功能：初始化功能描述
  作者：Hou
  邮箱：2429016980@qq.com
  时间：2023年10月06日 04:19:35
  版本：v1.0
  修改内容：vue2.0初始化模板
  修改人员：Hou
  修改时间：2023年10月06日 04:19:35
-->
<template>
  <div>
    <div class="login">
      <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
      <div class="container">
        <div class="title">
          <h3>手机号登录</h3>
          <p>未注册的手机号登录后将自动注册</p>
        </div>

        <div class="form">
          <div class="form-item">
            <input
              v-model="mobile"
              class="inp"
              maxlength="11"
              placeholder="请输入手机号码"
              type="text"
            />
          </div>
          <div class="form-item">
            <input
              v-model="picCode"
              class="inp"
              maxlength="4"
              placeholder="请输入图形验证码"
              type="text"
            />
            <img v-if="picUrl" :src="picUrl" @click="getPicCode" alt="" />
          </div>
          <div class="form-item">
            <input
              class="inp"
              v-model="msgCode"
              maxlength="6"
              placeholder="请输入短信验证码"
              type="text"
            />
            <button @click="getCode" :disabled="isCodeSent">
              {{
                second === totalSecond ? "获取验证码" : second + `秒后重新发送`
              }}
            </button>
          </div>
        </div>

        <div class="login-btn"
        @click="login"
        >登录</div>

        <div class="policy_tip">
          <van-checkbox
            v-model="checked"
            direction="horizontal"
            icon-size="20px"
          >
            <span>我已阅读并同意</span>
            <a href="https://seablog.netlify.app/">《用户服务协议》</a>
            <a href="https://seablog.netlify.app/">《用户隐私政策》</a>
          </van-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import(导入)其他文件（如：组件，工具js，第三方插件js，json文件，图片文件等）
// 从 '@/api/login' 模块中导入名为 getPicCoded 的函数
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'

export default {
  /** 注册组件 */
  components: {},
  /** 接受父组件传值 */
  props: {},
  name: 'LoginPage',
  data () {
    return {
      picKey: '', // 请求传递图形验证码的唯一标识
      picUrl: '', // 存储请求渲染的图片验证码地址

      // 获取验证码倒计时
      totalSecond: 60, // 总秒数
      second: 60, // 倒计时的秒数
      timer: null, // 定时器 id

      mobile: '', // 用户输入的手机号
      picCode: '', // 用户输入的图形验证码
      msgCode: '', // 6位数短信验证码

      checked: false, // 默认不勾选"我已阅读并同意"
      isCodeSent: false // 初始状态下未发送验证码
    }
  },
  /** 计算属性 */
  computed: {},
  /** 监听data数据变化 */
  watch: {},
  /** 所有方法 */
  methods: {
    // 获取图形验证码 异步方法，用于获取图形验证码数据并存储相关信息
    async getPicCode () {
      // 调用 getPicCode 函数从外部模块获取图形验证码数据
      const {
        data: { base64, key }
      } = await getPicCode()

      // 将获取的 base64 图片数据存储到 picUrl 变量中
      this.picUrl = base64 // 存储地址

      // 将获取的图形验证码的唯一标识存储到 picKey 变量中
      this.picKey = key // 存储唯一标识
    },

    // 判断用户手机号和图形验证码是否合法
    validFn () {
      // 验证手机号格式
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号') // 显示手机号格式错误的提示消息
        return false // 返回 false，表示验证不通过
      }

      // 验证图形验证码格式
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码') // 显示图形验证码格式错误的提示消息
        return false // 返回 false，表示验证不通过
      }
      return true
    },

    // 判断短信验证码是否正确
    isValidInput () {
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的手机验证码')
        return false
      }
      return true
    },

    // 异步方法，用于获取短信验证码并启动倒计时
    async getCode () {
      // 检查 validFn() 方法的返回值
      if (!this.validFn()) {
        // 如果 validFn() 返回 false，不执行后续操作，直接返回
        return
      }

      // 检查是否已经存在倒计时并且计时器已经结束
      if (!this.timer && this.second === this.totalSecond) {
        // 发送短信验证码请求,获取验证码
        await getMsgCode(this.picCode, this.picKey, this.mobile)
        this.$toast('发送成功，请注意查收')

        // 开启倒计时
        this.timer = setInterval(() => {
          this.second--

          // 倒计时结束时清除计时器，重置倒计时和计时器
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)

        // 发送请求，获取验证码
        this.$toast('发送成功，请注意查收') // 使用 Vant2 Toast 方法显示消息提示
      }
    },

    // 判断勾选用户协议
    isAgreementChecked () {
      return this.checked
    },

    // 获取验证码的逻辑
    // isGetCode () {
    //   return this.isCodeSent
    // },

    // 执行登录操作
    async login () {
      // 检查用户是否同意用户协议
      if (!this.isAgreementChecked()) {
        this.$toast('请先同意用户协议！')
        return
      }
      // 验证用户手机号和图形验证码是否合法
      if (!this.validFn()) {
        return
      }
      // if (!this.isGetCode()) {
      //   this.$toast('请先获取验证码！')
      //   return
      // }
      // 验证手机验证码是否合法
      if (!this.isValidInput()) {
        return
      }

      try {
        // 尝试进行登录操作
        const res = await codeLogin(this.mobile, this.msgCode)
        // 如果登录成功，更新用户信息并导航到首页
        this.$store.commit('user/setUserInfo', res.data)
        this.$router.push('/')
        // 显示登录成功的提示消息
        this.$toast('登录成功')
      } catch (error) {
        // 处理登录失败，例如显示错误消息
        console.error('登录失败:', error)
        // 显示登录失败的提示消息
        // this.$toast('您输入验证码不正确！')
      } finally {
        // 重置 isCodeSent 为 false，以允许重新发送验证码
        this.isCodeSent = false
      }
    }
  },
  /** 创建组件时执行(有VM对象this) */
  async created () {
    this.getPicCode()
  },

  /** 加载完组件时执行(主要预处理数据) */
  mounted () {},
  beforeCreate () {
    /** 生命周期 - 创建之前 */
  },
  beforeMount () {
    /** 生命周期 - 挂载之前 */
  },
  beforeUpdate () {
    /** 生命周期 - 更新之前 */
  },
  updated () {
    /** 生命周期 - 更新之后 */
  },
  beforeDestroy () {
    /** 生命周期 - 销毁之前 */
  },
  destroyed () {
    /** 生命周期 - 销毁完成 */
    // 离开页面销毁定时器
    clearInterval(this.timer)
  },
  activated () {
    /** keep-alive组件激活时调用。仅针对keep-alive组件有效 */
  },
  deactivated () {
    /** keep-alive组件停用时调用。仅针对keep-alive组件有效 */
  }
}
</script>
<style scoped lang="less">
/* @import url(); 引入css类 */
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;

    h3 {
      font-size: 26px;
      font-weight: normal;
    }

    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;

    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }

    img {
      width: 94px;
      height: 31px;
    }

    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 50px;
    margin-top: 39px;
    background: linear-gradient(90deg, #fab3b3, #ffbcb3 73%, #ffcaba);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }

  .policy_tip {
    text-align: center;
    font-size: 0.13rem;
    color: rgba(0, 0, 0, 0.3);
    margin-top: 1.15rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .policy_tip span {
    color: rgba(0, 0, 0, 0.3);
  }

  .policy_tip a {
    color: #4a90e2;
  }
}

</style>
