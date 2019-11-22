import React, { Component } from 'react'
import store from '../store'
import * as type from '../store/action-types';
import { bindActionCreators } from '../redux';
function incerment(payload){
    return { type: type.INCREMENT2,payload }
}
function decerment(payload){
    return { type: type.DECREMENT2 ,payload}
}
let actions = {
    incerment,decerment
}
// incerment = bindActionCreators(incerment,store.dispatch)
// decerment = bindActionCreators(decerment,store.dispatch)
actions = bindActionCreators(actions,store.dispatch)
export default class Counter extends Component {
    state = { number: store.getState().counter2.number }
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({ number: store.getState().counter2.number })
        })
    }
    componentWillUnmount() {
        this.unsubscribe()
    }
    render() {
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={()=>actions.incerment(6)}>加1</button>
                <button onClick={()=>actions.decerment(6)}>减1</button>
            </div>
        )
    }
}

