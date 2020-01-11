import React from 'react';
import ReactDOM from 'react-dom';
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'
const initialArg = 0;
function reducer(state, action) {
  switch (action.type) {
    case INCREMENT:
      return { number: state.number + 1 }
    case DECREMENT:
      return { number: state.number - 1 }
    default:
      return state;
  }
}
function init(initialArg) {
  return { number: initialArg }
}

let memorizedState;
function useReducer(reducer, initialArg, init) { // init 可选
  let initialState = void 0;
  if (typeof init != 'undefined') {
    initialState = init(initialArg)
  } else {
    initialState = initialArg;
  }
  memorizedState = memorizedState || initialState
  function dispatch(action) {
    memorizedState = reducer(memorizedState, action);
    render();
  }
  return [memorizedState, dispatch]
}
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialArg, init)
  return (<div>
    <p>{state.number}</p>
    <button onClick={() => dispatch({ type: INCREMENT })}>+</button>
    <button onClick={() => dispatch({ type: DECREMENT })}>-</button>
  </div>)
}

function render() {
  ReactDOM.render(<Counter />, document.getElementById('root'))
}

render();