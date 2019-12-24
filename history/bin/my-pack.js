#! /usr/bin/env node

const path = require('path');

// 编译
const Compiler = require('../lib/Compiler.js');
// 配置文件
const config = require(path.resolve('webpack.config.js'));

const complier = new Compiler(config);
complier.run()