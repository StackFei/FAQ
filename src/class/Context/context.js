import React from 'react';
// import ColorContext from './myContext';
let ColorContext = createContext();
function createContext() {
    class Provider extends React.Component {
        static value
        constructor(props) {
            super(props)
            Provider.value = props.value
            // this.state = { value: props.value }
        }
        static getDerivedStateFromProps(nextProps, prevState) {
            Provider.value = nextProps.value
            return {}
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
class Person extends React.Component {
    state = { color: 'red' }
    handler = (color) => {
        this.setState({ color })
    }
    render() {
        let contextValue = { color: this.state.color, handler: this.handler }
        return (<ColorContext.Provider value={contextValue}> <div style={{ border: `3px solid ${this.state.color}`, padding: '5px' }}>
            <Header />
            <Counter />
        </div></ColorContext.Provider >)
    }
}

class Header extends React.Component {
    static contextType = ColorContext;
    render() {
        return (
            <div style={{ border: `3px solid ${Header.contextType.Provider.value.color}` }}>
                Header
            <HeaderChild />
            </div>
        )
    }
}

class HeaderChild extends React.Component {
    static contextType = ColorContext;
    render() {
        return (
            <div style={{ border: `3px solid ${HeaderChild.contextType.Provider.value.color}` }}>
                HeaderChild
            </div>
        )
    }
}

function Counter(props) {
    return (<ColorContext.Consumer>
        {
            value => (
                <div style={{ border: `3px solid ${value.color}` }}>
                    Counter
                    <CounterChild />
                </div>
            )
        }
    </ColorContext.Consumer>)
}

function CounterChild(props) {
    return (<ColorContext.Consumer>
        {
            value => (
                <div style={{ border: `3px solid ${value.color}` }}>
                    CounterChild
                    <button onClick={() => value.handler('green')}>变色</button>
                </div>
            )
        }
    </ColorContext.Consumer>)
}

export default Person;



