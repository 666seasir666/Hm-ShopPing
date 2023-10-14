// 导入名为 request 的模块，通常用于发送网络请求
import request from '@/utils/request'

// 请求图形验证码接口
export const getPicCode = () => {
  // 发送 GET 请求获取图形验证码数据
  // 此处需要加return，以便接受请求返回的图形验证码数据
  return request.get('/captcha/image')
}

// 请求短信验证码接口
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 登录接口
export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      mobile,
      partyData: {},
      smsCode
    }
  })
}
