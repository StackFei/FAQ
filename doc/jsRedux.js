/**
 * 原生JS使用redux
 */
import { createStore } from './redux'

const size = document.getElementById('number')
const addBtn = document.getElementById('addBtn')
const jiaBtn = document.getElementById('jiaBtn')
const ADD = 'ADD'
const MINUS = 'MINUS'
function reducer(state = { number: 0 }, action) {
    switch (action.type) {
        case ADD:
            return { number: state.number + 1 };
        case MINUS:
            return { number: state.number - 1 };
        default:
            return state;
    }
}

const store = createStore(reducer);

function render() {
    size.innerHTML = store.getState().number
}
render()
store.subscribe(render)
addBtn.addEventListener('click', () => { store.dispatch({ type: ADD }) })
jiaBtn.addEventListener('click', () => { store.dispatch({ type: MINUS }) })
