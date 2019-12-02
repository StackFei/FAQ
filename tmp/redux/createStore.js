export default function createStore(reducer, preloadedState, enhancer) {
    // preloadedState初始值<可有可无> 为函数兼容store中的第二种写法
    if (preloadedState && typeof preloadedState === 'function') {
        enhancer = preloadedState
        preloadedState = undefined
    }
    if (enhancer) {
        return enhancer(createStore)(reducer, preloadedState)
    }
    let state;
    let listeners = [];
    function getState() {
        return state
    }
    function dispatch(action) {
        // 纯对象
        if (Object.getPrototypeOf(action) != Object.prototype) {
            throw new Error("Actions must be a pure object")
        }
        state = reducer(state, action)
        listeners.forEach(fn => fn())
    }
    function subscribe(listen) {
        listeners.push(listen)
        return function () {
            listeners = listeners.filter(item => item !== listen)
        }
    }
    dispatch({ type: '@@MY_REDUX_INIT' })
    return { dispatch, getState, subscribe }
}