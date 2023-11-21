const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 用于指定你的应用在被部署到服务器时的基本URL路径。
  // 在这里，你将其设置为当前路径，表示你的应用会相对于部署到的服务器的根路径
  publicPath: './',
  // 用于告诉构建工具是否需要对某些依赖进行ES6+代码的转译
  transpileDependencies: true
})
