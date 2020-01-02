const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const app = express();

const webpackConfig = require('./../webpack.config');
const webpack = require('webpack');

const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {}))

app.listen(5000, () => console.log('server is success'));

// node缓存服务器 中间件的作用 缓存 类似于webpack-dev-server