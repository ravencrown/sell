var path = require('path')
var express = require('express')    // node.js框架，用于启动web server
var webpack = require('webpack')
var config = require('../config')
var proxyMiddleware = require('http-proxy-middleware')  // http代理的中间件，可用于转发API
// webpack 相关配置
// webpack.dev.conf 开发时配置
// webpack.prod.conf 运行时配置
var webpackConfig = process.env.NODE_ENV === 'testing'
    ? require('./webpack.prod.conf')
    : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// 设置需要代理的接口
var proxyTable = config.dev.proxyTable

var app = express()

// express模拟接口请求
var appData = require('../data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

// express 路由
var apiRoutes = express.Router();

apiRoutes.get('/seller', function(req, res) {
    res.json({
        errno: 0,
        data: seller
    })
});

apiRoutes.get('/goods', function(req, res) {
    res.json({
        errno: 0,
        data: goods
    })
});

apiRoutes.get('/ratings', function(req, res) {
    res.json({
        errno: 0,
        data: ratings
    })
});

app.use('/api', apiRoutes);

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:' + port + '\n')
})
