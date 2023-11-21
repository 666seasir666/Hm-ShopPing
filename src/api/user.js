// 引入名为 request 的工具模块，用于发起 HTTP 请求
import request from '@/utils/request'

// 获取个人信息的 API 请求函数
export const getUserInfoDetail = () => {
  // 使用 request 对象的 get 方法发送 GET 请求，请求路径为 '/user/info'
  return request.get('/user/info')
}
