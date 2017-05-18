var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')    // 用于合并webpack的配置文件
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')  // webpack基本配置文件（开发时和运行时公用）
/**
 * [HtmlWebpackPlugin description]
 * @type {[type]}
 * 这个插件的作用是依据一个简单的模板，帮你生成最终的Html5文件，
 * 这个文件中自动引用了你打包后的JS文件。每次编译都在文件名中插入一个不同的哈希值
 */
var HtmlWebpackPlugin = require('html-webpack-plugin')  // webpack提供操作html的插件

// add hot-reload related code to entry chunks
// result: ["./build/dev-client", "./src/main.js"]
// 启动hot-reload的相关代码（热加载）
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

// 合并baseWebpackConfig和一下的配置
module.exports = merge(baseWebpackConfig, {
  module: {
    // 对一些独立的css文件以及它的预处理文件做一个编译
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    // 把源码中的process.env字符串替换成config.dev.env
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    // webpack优化插件
    new webpack.optimize.OccurenceOrderPlugin(),
    // hot-reload相关插件
    new webpack.HotModuleReplacementPlugin(),
    // 编译出现错误的时候，会跳过错误的编译代码，使编译后运行的包不会发生错误
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    //
    new HtmlWebpackPlugin({
      // 指定编译后生成的html文件名
      filename: 'index.html',
      // 需要处理的模板
      template: 'index.html',
      // 打包过程中输出的js、css的路径添加到html文件中
      // css文件插入到head中
      // js文件插入到body中
      inject: true
    })
  ]
})
