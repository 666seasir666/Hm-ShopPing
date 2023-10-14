module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // Vant 的引入组件，自动按需引入组件 (推荐)
  // 对于使用 babel7 的用户，可以在 babel.config.js 中配置
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}