import React, { useRef, forwardRef, useImperativeHandle } from 'react';
// 父组件可以随意操控子组件
function Child(props,parentRrf){
    console.log(props) // {t:'0'}
    return (<input ref={parentRrf} />)
}

// 只暴露对应的给父组件调用
// function Child(props,parentRrf){
//     let inputRef = useRef()
//     useImperativeHandle(parentRrf,()=>{
//         return {
//             focus(){
//                 inputRef.current.focus()
//             }
//         }
//     })
//     return (<input ref={inputRef} />)
// }

let ForwardRef = forwardRef(Child)
function Parent() {
    const parentRef = useRef()
    const Force = () => {
        parentRef.current.value ="<script></script>"
        parentRef.current.focus()
    }
    return (<>
        <button onClick={Force}>focus</button>
        <ForwardRef ref={parentRef} t='0'/>
    </>)
} 

export default Parent;