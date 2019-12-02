import React from 'react'
import ReactDOM from 'react-dom'

let root: HTMLElement | null = document.getElementById('root')

let style: React.CSSProperties = { color: 'red', fontSize: 40 }
let element = (<div className="title" style={style}>element</div>)
// let element = React.createElement('h1', {
//     classNme: 'title',
//     style
// },React)

ReactDOM.render(element, root)