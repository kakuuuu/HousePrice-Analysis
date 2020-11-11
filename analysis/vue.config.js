module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= 'HousePriceAnalysis'
        return args
      })
  },
  devServer: {
    open: false,
    disableHostCheck: true,
    https: false,
    hotOnly: false,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/api': {
        // 本地测试地址（可以随时发布的）
        target: "http://www.liaowang.xyz:3000",
        ws: true, // proxy websockets
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
}