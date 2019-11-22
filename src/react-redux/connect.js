import React from 'react';
import { bindActionCreators } from '../redux';
import Context from './Context';
/**
 * 高阶组件connect()() -> 最终还是返回一个组件
 * @param {映射值} mapStateToProps 
 * @param {映射动作} mapDispatchToProps 
 * @param {组件} Components 
 */
export default function (mapStateToProps, mapDispatchToProps) {
    return function (WrappedComponent) {
        return class extends React.Component {
            static contextType = Context; // this.context = {store}
            constructor(props, context) {
                super(props);
                this.state = mapStateToProps(context.store.getState())
                //兼容多中写法
                if (typeof mapDispatchToProps == 'function') {
                    this.actions = mapDispatchToProps(context.store.dispatch)
                } else if (typeof mapDispatchToProps == 'object') {
                    this.actions = bindActionCreators(mapDispatchToProps, context.store.dispatch)
                }
            }
            componentDidMount() {
                this.unsubscribe = this.context.store.subscribe(() => {
                    this.setState(mapStateToProps(this.context.store.getState()))
                })
            }
            componentWillUnmount() {
                this.unsubscribe()
            }
            render() {
                return (<WrappedComponent {...this.props} {...this.state} {...this.actions} />)
            }
        }
    }
}