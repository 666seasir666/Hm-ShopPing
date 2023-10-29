// 购物车接口

// 导入名为 request 的模块，通常用于发送网络请求
import request from '@/utils/request'

// 加入购物车接口：https://apifox.com/apidoc/shared-12ab6b18-adc2-444c-ad11-0e60f5693f66/api-70155770
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 获取购物车列表数据接口：https://apifox.com/apidoc/shared-12ab6b18-adc2-444c-ad11-0e60f5693f66/api-70227615
export const getCartList = () => {
  return request.get('/cart/list')
}

// 更新购物车商品数量更新接口:https://apifox.com/apidoc/shared-12ab6b18-adc2-444c-ad11-0e60f5693f66/api-70228554
export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 删除购物车商品接口：https://apifox.com/apidoc/shared-12ab6b18-adc2-444c-ad11-0e60f5693f66/api-70230928
export const delSelect = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
