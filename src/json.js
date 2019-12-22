const path = require('path');
const fs = require('fs');
const vm = require('vm');

function Module(id) {
    this.id = id;
    this.exports = {}
}

Module.wrap = [
    "(function(exports,module,require,__dirname,__filename){",
    "})"
]
Module._extenstions = {
    '.js'(module) {
        const content = fs.readFileSync(module.id, 'utf8');
        const contentStr = Module.wrap[0] + content + Module.wrap[1]
        const fn = vm.runInThisContext(contentStr)
        fn.call(module.exports, module.exports, module, req)
    },
    '.json'(module) {
        // console.log(module)
        const json = fs.readFileSync(module.id, 'utf8');
        module.exports = json
    }
}

function tryModuleLoad(module) {
    // console.log(module)
    const extension = path.extname(module.id, 'utf8')
    Module._extenstions[extension](module)
}
// 缓存 避免二次读取
Module._cache = {}
function req(modulePath) {
    let absPathName = path.resolve(__dirname, modulePath);
    /* ****************** 自动识别文件后缀  ******************/
    let extNames = Object.keys(Module._extenstions);
    let index = -1;
    let oldAbsPathName = absPathName
    function find(absPathName) {
        if (index === extNames.length) {
            return absPathName
        }
        try {
            fs.accessSync(absPathName)
            return absPathName
        } catch (e) {
            let ext = extNames[index++] //.js
            let netPath = oldAbsPathName + ext //path + .js
            return find(netPath)
        }
    }
    absPathName = find(absPathName)
    try {
        fs.accessSync(absPathName)
    } catch (e) {
        throw new Error('🚀')
    }
    /* ************************************/
    if (Module._cache[absPathName]) {
        return Module._cache[absPathName].exports
    }
    let module = new Module(absPathName);
    Module._cache[absPathName] = module
    tryModuleLoad(module);
    return module.exports;
}
// let obj = req('./json.json')
let obj = req('./js')
// obj = req('./js.js')
console.log(obj);
