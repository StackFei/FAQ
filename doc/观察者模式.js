function Observer() {
    this.statue = '😒';
    this.arr = [];
}

Observer.prototype.attach = function (fn) {
    this.arr.push(fn)
}

Observer.prototype.setState = function (newStatue) {
    this.statue = newStatue;
    this.arr.forEach(fn => fn.update(this.statue))
}

function Subject(name, target) {
    this.name = name;
    this, target = target;
}

Subject.prototype.update = function (newStatue) {
    console.log(`${this.name}监控到了小宝宝的${newStatue}变化`)
}

const o = new Observer()
const s1 = new Subject('我', o)
const s2 = new Subject('她', o)
o.attach(s1)
o.attach(s2)
o.setState('😺')

const middleWear = store => next => action => {
    next()
}