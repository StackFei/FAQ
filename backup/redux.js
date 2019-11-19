import React from 'react';
import ReactDOM from 'react-dom';


const TEXT = Symbol.for('TEXT')
const COLOR = Symbol.for('COLOR')
const initialState = {
    data: {
        text: '我是内容',
        color: 'red'
    }
}
function reducer(state = initialState, action) {
    switch (action.type) {
        case TEXT:
            // initial.data.text = action.text
            return { ...state, data: { ...state.data, text: action.payload } }
        case COLOR:
            // initial.data.color = action.color
            return { ...state, data: { ...state.data, color: action.payload } }
        default:
            return state;
    }
}
function createStore(reducer) {
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

const store = createStore(reducer)

// 渲染层
function renderRoot(initial) {
    const root = document.getElementById('root')
    root.innerHTML = initial.data.text;
    root.style.color = initial.data.color;
}
function renderApp() {
    renderRoot(store.getState())
}
renderApp()
store.subscribe(renderApp)
let unsubscribe = store.subscribe(renderApp)

setTimeout(() => {
    store.dispatch({ type: TEXT, payload: '6666' })
    unsubscribe()
    store.dispatch({ type: COLOR, payload: 'green' })
    renderApp(store.getState())
}, 2000)
