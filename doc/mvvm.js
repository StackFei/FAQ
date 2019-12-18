
function update() {
    console.log('update')
}

let oldArr = Array.prototype;;
let newArr = Object.create(oldArr);
['push', 'shift'].forEach(item => {
    newArr[item] = function () {
        update()
        oldArr[item].apply(this, arguments)
    }
})

function observer(obj) {
    if(Array.isArray(obj)){
        return obj.__proto__ = newArr
    }
    if (typeof obj !== 'object') {
        return obj
    }
    for (let key in obj) {
        defineReactive(obj, key, obj[key])
    }
}
function defineReactive(obj, key, value) {
    observer(value)
    Object.defineProperty(obj, key, {
        get() {
            return value
        },
        set(newValue) {
            if (newValue !== value) {
                observer(newValue)
                update()
                value = newValue
            }
        }
    })
}

const obj = { n: { m: 100 } };
observer(obj)
obj.n = {}
console.log(obj)