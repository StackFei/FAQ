function deepClone(value, hash = new WeakMap()) {
    // null undefined 特殊
    if (value == null) { return value }
    // 时间 追正则等特殊
    if (value instanceof RegExp) { return new RegExp(value) }
    // 函数 基本类型
    if (typeof value != 'object') { return value }
    // {} []
    let obj = new value.constructor();
    if (hash.get(value)) {
        return hash.get(value)
    }
    hash.set(value, obj)
    for (let key in value) {
        if (value.hasOwnProperty(key)) {
            obj[key] = deepClone(value[key],hash)
        }
    }
    return obj
}
const o = { a: 100, b: { c: 100 } };
const o1 = deepClone(o);
o1.b.c = 200;
console.log(o, o1)