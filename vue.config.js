module.exports = {
    publicPath: '/',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        open: true, //是否自动弹出浏览器页面
        host: "localhost", 
        port: '8081',
        https: false,
        hotOnly: false, 
        proxy: {
            '/api':{
                target:'http://localhost:8080',
                changeOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}