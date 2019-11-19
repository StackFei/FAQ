import React, { Component } from 'react'
import action from '../store/actions/couter1'

export default class counter1 extends Component {
    render() {
        return (
            <div>
                <p></p>
                <button onClick={() => action.ADD(1)}>加1</button>
                <button onClick={() => action.MINUS(1)}>减1</button>
            </div>
        )
    }
}

