import React, { Component } from 'react'
import actions from '../store/actions/counter1';
import { connect } from '../react-redux';

class Counter extends Component {
    render() {
        console.log('Counter1')
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

export default connect(mapStateToProps, actions)(Counter)

