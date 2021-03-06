const CompressionWebpackPlugin = require("compression-webpack-plugin");
const IS_PRODUCTION = process.env.NODE_ENV === "production";

module.exports = {
  configureWebpack: {
    externals: { "BMap": "BMap" }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'HousePriceAnalysis'
      return args
    })
    if (IS_PRODUCTION) {
      config
        .plugin("compression")
        .use(CompressionWebpackPlugin)
        .tap(() => [
          {
            test: /\.js$|\.html$|\.css/, // 匹配文件名
            threshold: 1024, // 超过1k进行压缩
            deleteOriginalAssets: false, // 是否删除源文件
          }
        ]);
    }
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
        // target: "http://localhost:3000/",
        ws: true, // proxy websockets
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  },
  lintOnSave: false,
  /**
   * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
   * https://cli.vuejs.org/zh/config/#productionsourcemap
   */
  productionSourceMap: false

}