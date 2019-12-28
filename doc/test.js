const Promise = require('./promise');

let p = new Promise((resolve,reject) => {
    resolve(0)
})

// let p1 = p.then((data) => {
//     return new Promise(function(resolve,reject){
//         setTimeout(function(){
//             resolve(new Promise(function(resolve,reject){
//                 setTimeout(function(){
//                     resolve(20000)
//                 },1000)
//             }))
//         },1000)
//     })
// })
// p1.then((data)=>{
//     console.log(data)
// },err => {
//     console.log(err)
// })

p.then().then().then(data => console.log(data))

// return new Promise((resolve, reject) => {
//     resolve(0)
// }).then(data => {
//     throw new Error('第一次出错了')
// }).catch(err => {
//     console.log(err,'2')
//     console.log('2')
// }).catch(err => {
//     console.log(err,'3')
//     console.log('3')
// }).then(data => {
//     throw new Error('第三次出错了')
// }).catch(err => {
//     console.log(err,'4')
//     console.log('4')
// }).then(data => {
//     console.log(data)
// })
