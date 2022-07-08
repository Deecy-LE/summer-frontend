const proxyObj = {}
proxyObj['/'] = {
    target: 'http://localhost:9090',
    changeOrigin: true,
    pathRewrite: {
        '^/': ''
    }
}
module.exports = {
    publicPath:"./",
    lintOnSave: false,
    devServer: {
        host: 'localhost',
        port: 8081,
        proxy: proxyObj
    },
    configureWebpack: config => {
        // 为生产环境修改配置...
        if (process.env.NODE_ENV === 'production') {
            config.mode = 'production';
            // 打包文件大小配置
            config.performance = {
              maxEntrypointSize: 10000000,
              maxAssetSize: 30000000
            }
        }
    }
}
