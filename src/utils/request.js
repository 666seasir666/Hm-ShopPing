/* 封装axios用于发送请求 */
import store from '@/store'
import axios from 'axios'
// 导入 Vant2 Toast弹窗提示
import { Toast } from 'vant'

// 创建一个Axios实例  自定义配置
// 好处：不会污染原始的 Axios实例
const instance = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 5000
//   headers: { 'X-Custom-Header': 'foobar' }
})

// 自定义配置 - 请求/响应 拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  Toast.loading({
    // 自定义加载图标
    message: '加载中...', // loading提示消息文本
    forbidClick: true, // 阻止用户点击其他元素
    loadingType: 'spinner', // 自定义图标
    duration: 0 // 持续时间为 0，表示手动关闭 不会自动消失
  })

  // 只要有token，就在请求时携带，便于请求需要授权的接口
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) { // 在发送请求之前做些什么
  // 开启loading,禁止背景点击

  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么 (默认axios会多包装一层data,需要响应式拦截中处理下)
  // 将响应数据存储在变量 res 中
  const res = response.data

  // 检查响应的状态是否不等于 200（HTTP 成功状态码）
  if (res.status !== 200) {
  // 如果状态码不是 200，显示一个提示消息
    Toast(res.message)

    // 返回一个被拒绝的 Promise，将错误消息作为拒绝原因
    return Promise.reject(res.message)
  } else {
    Toast.clear()// 清除 loading 中的效果
  }

  // 对响应数据做点什么
  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出配置好的实例
export default instance
