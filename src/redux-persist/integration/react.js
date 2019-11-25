import React from 'react'

export default class PersistGate extends React.Component {
    componentDidMount() {
        // 直接调用初始状态的方法， 将存储在内存中的状态合并到状态树中
        this.props.persistor.initState();
    }
    render() {
        return this.props.children
    }
}
export {
    PersistGate
}