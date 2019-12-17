const arr = [1, 2, 3, 4, 5];
let arr1 = arr.reduce((prev, current) => prev + current)
console.log(arr1)

const add = (a, b, c) => a + b + c;
const str = (str) => str.length;
const tag = (tag) => `$` + tag;
const compose = (...fns) => fns.reduce((a,b) => (...args) => a(b(...args)))
// function compose(...fns) {
//     return fns.reduce((prev, current) => {
//         return function (...args) {
//             return prev(current(...args))
//         }
//     })
// }
let result = compose(tag, str, add)('a', 'b', 'c');
console.log(result)