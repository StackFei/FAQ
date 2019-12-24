const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: "development",
    // devtool: "eval", // 调试专用可有可无
    // entry: './src/index.js', // 单入口
    entry: {
        index: './src/index.js',
        // vendor: ['react', 'react-dom']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash].js',
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
                test: /\.(js)$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        "presets":[
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        "plugins":[
                            "@babel/plugin-proposal-decorators",
                            "@babel/plugin-proposal-class-properties"
                        ]
                    }
                }
            },
            {
                test: /\.css$/, //以 .css 结尾的导入文件
                use: [MiniCssExtractPlugin.loader, 'css-loader','postcss-loader']
            },
            {
                test: /\.less$/, //以 .less 结尾的导入文件
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            },
            {
                test: /\.scss$/, //以 .scss 结尾的导入文件
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|png|jpeg|svg)$/, //以 .png 结尾的导入文件
                // use: 'file-loader', //直接拷贝到dist文件
                use: {
                    loader: 'url-loader',
                    options: { // 小于10k转换base64内嵌到html
                        limit: 14 * 1024,
                        outputPath: 'image',
                        publicPath: '/image'
                    }
                }
            },
            // {
                // test: /\.(html|htm)$/,
                // 在dist中的html使用外联img
                // loader: 'html-withimg-loader'
            // }
        ]
    },
    // 各种插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',//模板文件
            filename: 'index.html', //产生的文件
            hash: true, //缓存hash
            chunks: ['index'], //结合以下 设置导入模块顺序避免引用错误, 基本上很少用
            // chunksSortMode:'manual' //自己控制引入顺序
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            // [name].[hash].[chunkhash].[contenthash].css
            // 默认hash  任意一个文件改变都会改变  只改变单个改变文件 （hash）
            // 推荐只使用最后一个
            filename: 'css/[name].[contenthash].css',
            // chunkFilename:'[id].css',//异步加载分隔代码块用到
        })
    ],
    // 优化内容
    optimization: {
        // 优化插件
        minimizer: [
            new TerserWebpackPlugin({
                parallel: true,//开启多进程压缩
                cache: true
            }),
            new OptimizeCssAssetsWebpackPlugin({})
        ]
    }
}