import React, { Component } from 'react'
import * as type from '../store/action-types';
import actions from '../store/actions/counter1';
import { connect } from '../react-redux';

class Counter extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <p>{this.props.number}</p>
                <button onClick={() => this.props.increment(6)}>加1</button>
                <button onClick={() => this.props.decrement(6)}>减1</button>
            </div>
        )
    }
}

let mapStateToProps = state => state.counter1;
let mapDispatchToProps = dispatch => ({
    increment(payload) {
        dispatch({ type: type.INCREMENT1,payload })
    },
    decrement(payload) {
        dispatch({ type: type.DECREMENT1,payload })
    }
})

export default connect(mapStateToProps, actions)(Counter)

