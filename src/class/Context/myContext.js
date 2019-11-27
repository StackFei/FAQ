import React from 'react';

export default function createContext() {
    class Provider extends React.Component {
        static value
        constructor(props) {
            super(props)
            Provider.value = props.value
            // this.state = { value: props.value }
        }
        render() {
            return this.props.children
        }
    }
    class Consumer extends React.Component {
        render() {
            return this.props.children(Provider.value)
        }
    }
    return {
        Provider,
        Consumer
    }
}