function add1(str) {
    return str + '1'
}
function add2(str) {
    return str + '2'
}
function add3(str) {
    return str + '3'
}

// function list(str){
//     let str;
//     function add1(){
//         str + '1';
//         return this;
//     }
//     function add2(){
//         str + '2';
//         return this;
//     }
//     function add3(){
//         str + '3';
//         return this;
//     }
//     return {add1,add2,add3}
// }

function compose(...fn) {
    if (fn.length === 0) return args => args
    if (fn.length === 1) return fn[0]
    return fn.reduce((a, b) => (...args) => a(b(...args)))
}

const result2 = compose(add3, add2, add1)('彭云飞')
const result3 = compose(add3)('彭云飞')
const result4 = compose()('彭云飞')
console.log(result2, result3, result4)
// 彭云飞123 彭云飞3 彭云飞

// const result = add3(add2(add1('彭云飞')))
// console.log(result)

// const result1 = list('彭云飞').add1().add2().add3()
// console.log(result1)