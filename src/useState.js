import React from 'react';
import ReactDOM from 'react-dom';

// 普通实现方式 单个useState
// let memorizedState;
// function useState(initialState) {
//   memorizedState = memorizedState || initialState;
//   function setState(newState) {
//     memorizedState = newState;
//     render();
//   }
//   return [memorizedState, setState]
// }

// 普通实现方式 多个useState
// let memorizedState = [];
// let index = 0;
// function useState(initialState) {
//   let currentIndex = index;
//   memorizedState[index] = memorizedState[index] || initialState;
//   function setState(newState) {
//     memorizedState[currentIndex] = newState;
//     render();
//   }
//   return [memorizedState[index++], setState]
// }

// useReducer 实现方式
// let memorizedState;
// function useReducer(reducer, initialArg, init) { // init 可选
//   let initialState = void 0;
//   if (typeof init != 'undefined') {
//     initialState = init(initialArg)
//   } else {
//     initialState = initialArg;
//   }
//   memorizedState = memorizedState || initialState
//   function dispatch(action) {
//     memorizedState = reducer(memorizedState, action);
//     render();
//   }
//   return [memorizedState, dispatch]
// }

// function useState (initialState){
//   return useReducer( (oldState, newState) => newState , initialState)
// }

// 复杂实现 链表实现
let firstWorkInProgressHook = { memorizedState: null, next: null };
let workInProgressHook = firstWorkInProgressHook;
function useState(initialState) {
  let currentHook = workInProgressHook.next ?
    workInProgressHook.next :
    { memorizedState: initialState, next: null };
  function steState(newState) {
    currentHook.memorizedState = newState;
    render()
  }
  if (workInProgressHook.next) {
    workInProgressHook = workInProgressHook.next
  } else {
    workInProgressHook.next = currentHook;
    workInProgressHook = currentHook
  }
  return [currentHook.memorizedState, steState]
}

function Counter() {
  const [number, setNumber] = useState(0)
  return (<div>
    <p>{number}</p>
    <button onClick={() => setNumber(number + 1)}>+</button>
  </div>)
}

function render() {
  // index = 0; // 多个useState简答实现的坑
  // workInProgressHook = firstWorkInProgressHook; //链表实现
  ReactDOM.render(<Counter />, document.getElementById('root'))
}

render();