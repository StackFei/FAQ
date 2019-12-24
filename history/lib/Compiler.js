const path = require('path');
const fs = require('fs');

class Complier {
    constructor(config) {
        this.config = config;
        // 入口文件的路径
        this.entryId; // ./src/index.js
        // 模块依赖
        this.modules = {};
        // 入口路径
        this.entry = config.entry;
        // 运行命令的路径 根路径
        this.root = process.cwd();
    }

    run() {
        // 执行 boolean 知否是主模块
        this.buildModule(path.resolve(this.root, this.entry), true)
        // 发射一个文件 打包后的文件
        this.emitFile()
    }

    getSource(modulePath) {
        return fs.readFileSync(modulePath, 'utf8')
    }

    buildModule(modulePath, isEntry) { // 模块构建
        const source = this.getSource(modulePath); // 读取文件资源
        // 模块id modulePath = this.root - modulePath  './src/index.js'
        const moduleName = './' + path.relative(this.root, modulePath);
        // console.log(moduleName, source)
        isEntry && (this.entryId = moduleName);
        // 解析 修改source源码 返回依赖列表
        const { sourceCode, dependencies } = this.parse(source, path.dirname(moduleName))
        this.modules[moduleName] = sourceCode;
    }

    // 解析源码
    parse(source, parentPath){
        console.log(source, parentPath)
    }

    emitFile() {

    }
}

module.exports = Complier;