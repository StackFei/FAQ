export default function createStore(reducer) {
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