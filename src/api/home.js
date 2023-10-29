// 获取首页数据接口：https://apifox.com/apidoc/shared-12ab6b18-adc2-444c-ad11-0e60f5693f66/api-70115944

// 导入名为 request 的模块，通常用于发送网络请求
import request from '@/utils/request'

// 获取首页数据
export const getHomeData = () => {
  return request.get('/page/detail', {
    params: {
      pageId: 0
    }
  })
}
