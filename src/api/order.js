// 订单结算 - 封装通用接口

// 导入名为 request 的模块，通常用于发送网络请求
import request from '@/utils/request'

// 获取订单结算
// mode:cart   => obj { cartIds }
// mode:buyNow   => obj { oodsId  goodsNum    goodsSkuId }
export const checkOrder = (mode, obj) => {
  // 接口地址：https://apifox.com/apidoc/shared-12ab6b18-adc2-444c-ad11-0e60f5693f66/api-70252418
  return request.get('/checkout/order', {
    params: {
      mode, // 结算模式（buyNow立即购买 cart购物车）
      delivery: 10, // 配送方式（10快递配送 20上门自提）
      couponId: 0, // 优惠券ID
      isUsePoints: 0, // 是否使用积分抵扣（1使用 0不使用）
      ...obj // 将传递过来的的参数对象 动态展开
    }
  })
}

// 提交订单
export const submitOrder = (mode, params) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10, // 物流方式  配送方式 (10快递配送 20门店自提)
    couponId: 0, // 优惠券 id
    payType: 10, // 余额支付
    isUsePoints: 0, // 是否使用积分
    ...params
  })
}

// 订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page // list
    }
  })
}
