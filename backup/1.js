const reducedFilter = (data, keys, fn) => {
    data.filter(fn).map(el => {
        keys.reduce((acc, key) => {
            acc[key] = el[key]; 
            return acc;
        }, {})
    });
}

const data = [
    {
        id: 1,
        name: 'john',
        age: 24
    },
    {
        id: 2,
        name: 'mike',
        age: 50
    }
];

let a = reducedFilter(data, ['id', 'name'], item => item.age > 24); 
console.log(a)
// [{ id: 2, name: 'mike'}]
