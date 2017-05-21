var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')    // 定义当前项目的根目录

module.exports = {
  // 页面入口文件配置
  entry: {
    // key: value
    app: './src/main.js'
  },
  // 入口文件输出配置
  output: {
    // 输出目录
    path: config.build.assetsRoot,
    // 请求的静态资源绝对路径
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    // name：对应entry的key,即app,所以输出的文件名是app.js
    filename: '[name].js'
  },
  // 其它解决方案配置: 通过require、import引入的模块的相关配置
  resolve: {
    // 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    extensions: ['', '.js', '.vue'],
    // require或者import找不到模块的时候，可以去../node_modules目录中查找
    // fallback是模块在root及默认路径下都未找到时的最终查找路径
    fallback: [path.join(__dirname, '../node_modules')],
    // 模块别名定义
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'common': path.resolve(__dirname, '../src/common'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  // resolveLoader相当于是针对webpack Loader 的单独 resolve 配置，做用和resolve一样，但只作用于webpack loader
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  /**
   * [module description]
   * webpack使用loaders解析模块时，分别有个3个状态，分别是preloaders,loaders,postloaders,分别代表前中后三个处理状态
   * 1.对于预编译的javascript（如coffee，es6等）和一些非js文件，在preloaders里面处理，比如图片的压缩，或者使用JSHint, 对JS代码进行检查
   * 2.对于javascript的loader建议在loader或preloader里面进行处理；
   * 3.建议preloader 和 postloader 的过程中，使用相同的语言
   *
   */
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    // 加载器配置
    loaders: [
      {
        // 一个匹配loaders所处理的文件的拓展名的正则表达式
        test: /\.vue$/,
        // loader的名称
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        // 为loaders提供额外的设置选项
        query: {
          /**
           * [limit description]
           * 图片文件 <10KB 的时间，会生成一个base64字符串，然后打包到编译后的文件里
           * 如果图片文件 >10KB,则单独生成一个文件
           */
          limit: 10000,
          // static/img/[name].[hash:7].[ext]
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          // static/fonts/[name].[hash:7].[ext]
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    // css相关的loader都在这配置
    loaders: utils.cssLoaders()
  }
}
