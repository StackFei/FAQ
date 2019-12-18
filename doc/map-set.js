// set
// 交集 差集 并集
const arr1 = [1,2,3,4,3,1];
const arr2 = [2,3,4,5,2];

const bing = () => {
    const newArr = new Set([...arr1,...arr2]);
    return [...newArr]
}
console.log(bing())

const jiao = () => {
    const new1 = new Set(arr1)
    const new2 = new Set(arr2)
    return [...new1].filter(item => {
        return new2.has(item)
    })
}
console.log(jiao())

const cha = () => {
    const new1 = new Set(arr1)
    const new2 = new Set(arr2)
    return [...new1].filter(item => {
        return !new2.has(item)
    })
}
console.log(cha())

// map
