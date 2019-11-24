import React from 'react';
import MyContext from './Context';
export default class Provider extends React.Component {
    render() {
        return (<MyContext.Provider value={{ store: this.props.store }} >
            {this.props.children}
        </MyContext.Provider>)
    }
}