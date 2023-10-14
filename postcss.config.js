// 移动端Vw适配
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // VW适配标准的屏的宽度 iPhone x
      // 设计图 750, 调成1倍 => 适配375标准屏幕
      // 设计图 640, 调成1倍 => 适配320标准屏幕
      viewportWidth: 375
    }
  }
}
