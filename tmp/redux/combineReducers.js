export default function combineReducers(reducers) {
    return function (state = {}, action) {
        let nextState = {}      // 存储reducer
        let hashChange = false; // 是否返回新reducer渲染
        for (let key in reducers) {
            let reducer = reducers[key]
            let prevStateForKey = state[key];                       // 上一个老reducer
            let nextStateForKey = reducer(prevStateForKey, action)  // 下一个新reducer
            nextState[key] = nextStateForKey
            hashChange = hashChange || nextStateForKey != prevStateForKey
        }
        return hashChange ? nextState : state
    }
}