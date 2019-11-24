import React, { Component } from 'react'
import actions from '../store/actions/counter2';
import { connect } from '../react-redux';

class Counter extends Component {
    render() {
        console.log('Counter2')
        return (
            <div>
                <p>{this.props.number}</p>
                <button onClick={() => this.props.increment(6)}>加1</button>
                <button onClick={() => this.props.decrement(6)}>减1</button>
            </div>
        )
    }
}

let mapStateToProps = state => state.counter2;

export default connect(mapStateToProps, actions)(Counter)

