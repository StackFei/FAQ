
import reducer from './reducer'
import logger from '../redux-logger'
import promise from '../redux-promise'
import thunk from '../redux-thunk'
import { createStore, compose, applyMiddleware } from '../redux'

let store = applyMiddleware(promise, thunk, logger)(createStore)(reducer);

export default store;
// function applyMiddleware(...middlewares) {
//     return function (createStore) {
//         return function (reducer) {
//             let store = createStore(reducer)
//             let dispatch;
//             let middlewareAPI = {
//                 getState: store.getState,
//                 dispatch: (...args) => dispatch(...args) // 返回包装后的dispatch
//             }
//             // middlewares -> [promise, thunk, logger]中间件
//             // 递归顺序执行logger执行结果 -> thunk执行结果 -> promise执行(返回的dispatch)
//             middlewares = middlewares.map(middleware => middleware(middlewareAPI))
//             dispatch = compose(...middlewares)(store.dispatch)
//             return {
//                 ...store,
//                 dispatch
//             }
//         }
//     }
// }

// 原始使用方法
// let oldStore = store.dispatch
// store.dispatch = function(action){
//     console.log('%c prev state','font:bold;color:gray',store.dispatch())
//     console.log('%c  action','font:bold;color:green',action)
//     oldStore(action)
//     console.log('%c next state','font:bold;color:blue',store.getState())
// }

