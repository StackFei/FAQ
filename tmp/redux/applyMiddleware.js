import compose from './compose';
export default function applyMiddleware(...middlewares) {
    return function (createStore) {
        return function (reducer) {
            let store = createStore(reducer)
            let dispatch;
            let middlewareAPI = {
                getState: store.getState,
                dispatch: (...args) => dispatch(...args) // 返回包装后的dispatch
            }
            // middlewares -> [promise, thunk, logger]中间件
            // 递归顺序执行logger执行结果 -> thunk执行结果 -> promise执行(返回的dispatch)
            middlewares = middlewares.map(middleware => middleware(middlewareAPI))
            dispatch = compose(...middlewares)(store.dispatch)
            return {
                ...store,
                dispatch
            }
        }
    }
}