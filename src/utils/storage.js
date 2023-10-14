// 常量 INFO_KEY 用于存储个人信息的本地存储键名
const INFO_KEY = 'hm_shopping_info'
// 常量HISTORY_KEY，并为其分配了值'hm_history_list'
const HISTORY_KEY = 'hm_history_list'

// 获取个人信息
export const getInfo = () => {
  // 从本地存储中获取存储的个人信息
  const result = localStorage.getItem(INFO_KEY)
  // 如果获取到了信息，则解析为对象并返回，否则返回一个包含默认值的对象
  return result
    ? JSON.parse(result)
    : {
        token: '',
        userId: ''
      }
}

// 设置个人信息
export const setInfo = (info) => {
  // 将传入的个人信息对象转换为 JSON 字符串，并存储到本地存储中
  localStorage.setItem(INFO_KEY, JSON.stringify(info))
}

// 移除个人信息
export const removeInfo = () => {
  // 从本地存储中移除存储的个人信息
  localStorage.removeItem(INFO_KEY)
}

// 从本地存储获取搜索历史列表
export const getHistoryList = () => {
  const result = localStorage.getItem(HISTORY_KEY) // 从本地存储中获取数据
  return result ? JSON.parse(result) : [] // 如果数据存在，解析并返回；否则返回一个空数组
}
// 将搜索历史列表设置到本地存储中
export const setHistoryList = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))// 将提供的数组以JSON格式存储到本地存储中
}
