import React, { useImperativeHandle, forwardRef, useRef } from 'react'
import ReactDOM from 'react-dom'
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
let oldRef;
function Child(props,ref) {
    let ChildRef = useRef();
    oldRef = ChildRef;
    console.log(oldRef === ChildRef)
    useImperativeHandle(ref,()=>({
        getValue(){
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