import React, { useImperativeHandle, forwardRef } from 'react'
import ReactDOM from 'react-dom'
// import React from './react/react';

// function btnClick() {
//     alert('btn')
// }

// let element = (
//     <button id="btn" style={{ backgroundColor: 'red' }} onClick={btnClick}>
//         btn
//         <b>
//             hello
//         </b>
//     </button>
// );

// react对象元素
// let element = React.createElement(
//     'button',
//     { id: 'btn', style: { backgroundColor: 'red', color: 'green' }, onClick: btnClick },
//     'btn',
//     React.createElement('b', {}, 'hello')
// )

// class Count extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = { number: 0 }
//     }
//     componentWillMount(){
//         console.log('componentWillMount')
//     }
//     componentDidMount(){
//         console.log('componentDidMount')
//         setInterval(()=>{
//             // this.setState({ number: this.state.number + 1 })
//         },1000)
//     }
//     shouldComponentUpdate(nextProps, nextState){
//         return true
//     }
//     componentDidUpdate(){
//         console.log('componentDidUpdate')
//     }
//     // increment = () => {
//     //     this.setState({ number: this.state.number + 1 })
//     // }
//     render() {
//         console.log('render')
//         // let p = React.createElement('p', { style: { color: 'red' } }, this.props.name, this.state.number);
//         // let button = React.createElement('button', { onClick: this.increment }, "+")
//         // return React.createElement('div', {}, p, button)
//         return this.state.number
//     }
// }
// let element = React.createElement(Count, { name: '计数器' })
let currentRef;
function useRef() {
    if (!currentRef) {
        currentRef = { current: null }
    }
    return currentRef;
}
function Parent() {
    let parentRef = useRef()
    const getVal = () =>{
        console.log(parentRef.current.getValue())
    }
    const getFocus = () =>{
        parentRef.current.focus()
    }
    return (<div>
        <Child ref={parentRef} />
        <button onClick={getVal}>getValue</button>
        <button onClick={getFocus}>getFocus</button>
    </div>)
}
function Child(props,ref) {
    let ChildRef = useRef();
    useImperativeHandle(ref,()=>({
        getValue(){
            console.log(ChildRef)
            return ChildRef.current.value;
        },
        focus(){
            ChildRef.current.focus()
        }
    }))
    return <input ref={ChildRef} />
}
Child = forwardRef(Child)
ReactDOM.render(<Parent />, document.getElementById('root'))