// 引入axios请求工具
import request from '@/utils/request'

// 获取"商品搜索"列表数据
// 接口地址：https://apifox.com/apidoc/shared-12ab6b18-adc2-444c-ad11-0e60f5693f66/api-70132549
export const getProList = (paramsObj) => {
  // 从参数对象中解构出分类ID、商品名称和页数
  const { categoryId, goodsName, page } = paramsObj
  // 发送GET请求到 '/goods/list' 路径，携带参数：categoryId、goodsName 和 page
  return request.get('/goods/list', {
    params: {
      categoryId,
      goodsName,
      page
    }
  })
}

// 获取"商品详情页"数据
// 接口地址：https://apifox.com/apidoc/shared-12ab6b18-adc2-444c-ad11-0e60f5693f66/api-70133653
export const getProDetail = (goodsId) => {
  return request.get('/goods/detail', {
    // 如果是get请求走params
    params: {
      goodsId// 商品 ID 作为参数传递
    }
  })
}

// 获取"商品评价"数据
// 接口地址：https://apifox.com/apidoc/shared-12ab6b18-adc2-444c-ad11-0e60f5693f66/api-70143502
export const getProComments = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    // 如果是get请求走params
    params: {
      goodsId, // 商品id
      limit// 获取评价数量
    }
  })
}
