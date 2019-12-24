const path = require('path');
module.exports = {
    mode: "development",
    entry: './src/index.js', // 单入口
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash].js',
        publicPath: '/', //访问根路径在资源前加
    }
}