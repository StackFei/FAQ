const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    // devtool: "eval", // 调试专用可有可无
    entry: './src/index.js', // 单入口
    // entry: {
    //     index: './src/index.js',
    //     login: './src/login.js'
    // },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        // filename: '[name].js',
        // filename: '[name].[hash].js',
        publicPath: '/', //访问根路径在资源前加
    },
    // 设置静态访问目录
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8080,
        host: 'localhost',
        compress: true //是否压缩 可有可无
    },
    // 解析各种语言模块
    module: {
        rules: [
            {
                test: /\.css$/, //以 .css 结尾的导入文件
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|png|jpeg|svg)$/, //以 .png 结尾的导入文件
                // use: 'file-loader', //直接拷贝到dist文件
                use: {
                    loader: 'url-loader',
                    options: { // 小于10k转换base64内嵌到html
                        limit: 14 * 1024
                    }
                }
            },
        ]
    },
    // 各种插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',//模板文件
            filename: 'index.html', //产生的文件
            // hash:true, //缓存hash
            // chunks:['login','index'], //结合以下 设置导入模块顺序避免引用错误, 基本上很少用
            // chunksSortMode:'manual'
        }),
        new CleanWebpackPlugin()
    ]
}