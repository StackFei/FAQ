let arrayProps = Array.prototype;
let proto = Object.create(arrayProps);
// 重写数组中的方法
['push', 'unshift', 'splice'].forEach(method => {
    proto[method] = function (...args) {
        // 判断数组中添加方法
        let inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break;
            case 'splice': //splice用发 传递三个参数才是添加
                inserted = args.slice(2)
            default:
                break;
        }
        console.log('数组更新了')
        ArrayObserver(inserted)
        arrayProps[method].call(this, ...args)
    }
})

function ArrayObserver(obj) {
    for (let i = 0; i < obj.length; i++) {
        let item = obj[i]
        observer(item)
    }
}

function observer(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj
    }
    if (Array.isArray(obj)) {
        // 增加数组的参数中可能也会添加对象类型
        Object.setPrototypeOf(obj, proto)
        // 数组循环是否侦测
        ArrayObserver(obj)
    } else {
        for (const key in obj) {
            Reactive(obj, key, obj[key])
        }
    }
}

function Reactive(obj, key, value) {
    observer(value)
    Object.defineProperty(obj, key, {
        get() {
            return value
        },
        set(newValue) {
            if (value !== newValue) {
                observer(newValue)
                value = newValue
                console.log('数据更新')
            }
        }
    })
}

// 对象类型检测
// let data = {
//     name:'守夜人笔记',
//     hobby:{
//         d:2
//     }
// }
// observer(data)
// data.name ="666"
// data.hobby = {}
// data.hobby.d = ''

// 数组类型 
let data = { a: [1, 2, 3, { name: "📒" }] }
observer(data)
// data.a = []
// data.a.push({ name: "守夜人" })
// data.a[4].name = "守夜人📒"