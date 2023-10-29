// 收获地址api

// 导入名为 request 的模块，通常用于发送网络请求
import request from '@/utils/request'

// 获取地址列表
export const getAddressList = () => {
  // 收货地址列表接口：https://apifox.com/apidoc/shared-12ab6b18-adc2-444c-ad11-0e60f5693f66/api-70262561
  return request.get('/address/list')
}
