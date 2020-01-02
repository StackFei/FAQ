const webpack = require('webpack');
const config = require('./webpack.config');
const compiler = webpack(config);
compiler.run((err, start) => {
    console.log(err)
    console.log(start)
})

// 包含webpack运行时的所有的钩子函数