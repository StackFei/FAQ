import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from './react-redux';
// import store from './store';
// import Counter from './components/counter'
// import Counter1 from './components/counter1'
// import Counter2 from './components/counter2'
// ReactDOM.render(<Provider store={store}> 
//     {/* <Counter /> */}
//     <Counter1 />
//     <hr />
//     <Counter2 />
// </Provider>, document.getElementById('root'))

const UPDATE_TITLE_COLOR = 'UPDATE_TITLE_COLOR'
const UPDATE_TITLE_TEXT = 'UPDATE_TITLE_TEXT'
const UPDATE_CONTENT_COLOR = 'UPDATE_CONTENT_COLOR'
const UPDATE_CONTENT_TEXT = 'UPDATE_CONTENT_TEXT'

function createStore(reducer) {
    let state,listener = []
    function getState() {
        return state;
    }
    function dispatch(action) {
        state = reducer(state, action)
        listener.forEach(fn => fn())
    }
    function subscribe (lister){
        listener.push(lister)
        return function(){
            listener = listener.filter(item => item !== lister)
        }
    }
    dispatch({type:"@@MY_REDUX_INIT"}) 
    return { getState, dispatch, subscribe }
}
let initialvalue = { 
    title: { color: 'red', text: '标题' },
    content: { color: 'yellow', text: '内容' }
}
function reducer(state=initialvalue, action) {
    switch (action.type) {
        case UPDATE_TITLE_COLOR:
            return { ...state, title: { ...state.title, color: action.payload } }
        case UPDATE_TITLE_TEXT:
            return { ...state, title: { ...state.title, text: action.payload } }
        case UPDATE_CONTENT_COLOR:
            return { ...state, content: { ...state.content, color: action.payload } }
        case UPDATE_CONTENT_TEXT:
            return { ...state, content: { ...state.content, text: action.payload } }
        default:
            return state;
    }
}

const store = createStore(reducer)

function renderApp() {
    renderTitle(store.getState().title)
    renderContent(store.getState().content)
}

function renderTitle(state) {
    let title = document.getElementById('title');
    title.style.color = state.color;
    title.innerHTML = state.text;
}

function renderContent(state) {
    let content = document.getElementById('content')
    content.style.color = state.color;
    content.innerHTML = state.text;
}

renderApp()
const unScriber = store.subscribe(renderApp)

setTimeout(() => {
    store.dispatch({ type: 'UPDATE_TITLE_TEXT', payload: '新标题' })
    unScriber()
    store.dispatch({ type: 'UPDATE_CONTENT_TEXT', payload: '新内容' })
}, 1000)