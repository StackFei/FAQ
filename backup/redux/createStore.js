export default function createStore(reducer) {
    let state;
    let listeners = [];
    function getState() {
        return state
    }
    function dispatch(action) {
        state = reducer(state, action)
        listeners.forEach(fn => fn())
    }
    function subscribe(listen) {
        listeners.push(listen)
        return function () {
            listeners = listeners.filter(item => item !== listen)
        }
    }
    dispatch({ type: '@@react-redux-initial' })
    return { dispatch, getState, subscribe }
}