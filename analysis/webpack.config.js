module.exports = {
  module: {
    rules: [

      {
        test: /\.less$/,
        use: [
          'style-loader', 'css-loader', 'less-loader', {
            loader: 'style-resources-loader',
            options: {
              patterns: path.resolve(__dirname, 'path/to/less/variables/*.less'),
              injector: 'append'
            }
          }
        ]
      }
    ]
  },
  // 插件忽略
}