const path = require('path');
//  webpack-cli 打包的功能概述
const pkgPath = require.resolve('webpack-cli/package.json');
const pkg = require(pkgPath);
require(path.resolve(
    path.dirname(pkgPath),
    './bin/cli.js'
))