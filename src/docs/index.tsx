import React from 'react'
import ReactDOM from 'react-dom'

let root: HTMLElement | null = document.getElementById('root')

// one
let title: string = 'react'
let style: React.CSSProperties = { color: 'red', fontSize: 40 }

//two
function getRender(name: string): React.ReactElement {
    if (name) {
        return <h1>hello {name}</h1>
    }
    return <h1>fuck</h1>
}
let render = getRender('react')

ReactDOM.render(<div className="title" style={style}>{render}</div>, root)