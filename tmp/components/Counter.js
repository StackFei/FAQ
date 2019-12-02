import React, { Component } from 'react'
import actions from '../store/actions/counter';
import { connect } from '../react-redux';

class Counter extends Component {
    render() {
        return (
            <div>
                <p>{this.props.number}</p>
                <button onClick={() => this.props.increment(6)}>加1</button>
                <button onClick={() => this.props.asyncIncrement(6)}>async1</button>
                <button onClick={() => this.props.promiseIncrement(6)}>promise1</button>
                <button onClick={() => this.props.decrement(6)}>减1</button>
            </div>
        )
    }
}

let mapStateToProps = state => state;

export default connect(mapStateToProps, actions)(Counter)

