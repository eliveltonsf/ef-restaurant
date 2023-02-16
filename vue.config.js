const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less:{
        additionalData: `@import "~@/styles/variables.less";`
      }
    }
  },
  chainWebpack: (config) => {

    const svgRule = config.module.rule('svg');
 
    svgRule.uses.clear();
 
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('file-loader')
      .loader('vue-svg-loader');
  },
})
