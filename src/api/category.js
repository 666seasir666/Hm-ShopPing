// 商品全部分类接口

// 导入名为 request 的模块，通常用于发送网络请求
import request from '@/utils/request'

// 获取分类数据
export const getCategoryData = () => {
  // 接口请求地址:
  // https://apifox.com/apidoc/shared-12ab6b18-adc2-444c-ad11-0e60f5693f66/api-70515470
  return request.get('/category/list')
}
