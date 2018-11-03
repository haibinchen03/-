module.exports = {
    baseUrl: './',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.0.188:8083',
                ws: true,
                changeOrigin: true,
                pathRewrite:{
                    '^/api': ''
                }
            },
        }
    }//配置代理
} ;//跨域请求