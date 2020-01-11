import React from 'react';
import ReactDOM from 'react-dom';

// 单个简单的useEffect实现
// let lastDependencies;
// function useEffect(callback, dependencies) {
//   if (!dependencies) return callback();
//   let changed = lastDependencies ? !dependencies.every(
//     (item, index) => item === lastDependencies[index]
//   ) : true
//   if(changed){
//     callback();
//     lastDependencies = dependencies
//   }
// }

// 多个简单的useEffect实现 与useState合并实现
let memorizedState = [];
let index = 0;
function useState(initialState) {
  let currentIndex = index;
  memorizedState[index] = memorizedState[index] || initialState;
  function setState(newState) {
    memorizedState[currentIndex] = newState;
    render();
  }
  return [memorizedState[index++], setState]
}
function useEffect(callback, dependencies) {
  if (!dependencies) {
    index ++;
    return callback()
  };
  let lastDependencies = memorizedState[index];
  let changed = lastDependencies ? !dependencies.every(
    (item, index) => item === lastDependencies[index]
  ) : true
  if(changed){
    callback();
    memorizedState[index] = dependencies
  }
  index ++;
}

function Counter() {
  const [name, setName] = useState('计数器')
  const [number, setNumber] = useState(0)

  useEffect(() => {
    console.log(0)
  }, [])
  
  useEffect(() => {
    console.log(1)
  }, [number])
  return (<div>
    <p>{number}: {name}</p>
    <button onClick={() => setName(Date.now() + '------')}>+</button>
    <button onClick={() => setNumber(number + 1)}>+</button>
  </div>)
}

function render() {
  index = 0
  ReactDOM.render(<Counter />, document.getElementById('root'))
}

render();