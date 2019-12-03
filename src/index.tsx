import React, { ReactElement, FunctionComponent, Component } from './lib/react'
import ReactDOM from './lib/react-dom'

let root: HTMLElement | null = document.getElementById('root')!

let style: React.CSSProperties = { color: 'red', fontSize: 40 }
// let element = (<div className="title" style={style}>element</div>)
// let element:ReactElement = React.createElement('h1', {
//     classNme: 'title',
//     style
// },'hello','word')
// console.log(element)

interface CountProps { }
// 函数式
// let Count: FunctionComponent = (props: CountProps): ReactElement => {
//     return React.createElement('h1', {
//         classNme: 'title',
//         style
//     }, 'hello', 'word')
// }
// let element: ReactElement = React.createElement(Count, { title: '标题' })

// 类
class Counter extends Component<CountProps>{
    constructor(props:CountProps){
        super(props)
    }
    render() {
        return React.createElement('h1', {
            classNme: 'title',
            style
        }, 'hello', 'word')
    }
}
let element: ReactElement = React.createElement(Counter, { title: '标题' })
ReactDOM.render(element, root)