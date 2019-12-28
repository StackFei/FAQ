const fs = require('fs');

let schema = {};
const e = {
    arr: [],
    on(fn) {
        this.arr.push(fn)
    },
    emit() {
        this.arr.forEach(fn => fn())
    }
}
e.on(() => console.log('ok'))
e.on(() => {
    if (Object.keys(schema).length === 2) {
        console.log(schema)
    }
})

fs.readFile('./doc/test.txt', 'utf8', (err, data) => {
    schema['1'] = data;
    e.emit()
})

fs.readFile('./doc/test.txt', 'utf8', (err, data) => {
    schema['2'] = data;
    e.emit()
})