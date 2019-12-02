import React from 'react'
import MyContext from './Context'
import { bindActionCreators } from '../redux'

export default function (mapStateToProps, mapDispatchToProps) {
    return function (WrappedComponent) {
        return class extends React.Component {
            // 上下文关键字 contextType = {store}
            static contextType = MyContext
            constructor(props, context) {
                super(props)
                // 使用mapState缓存第一次存储的值
                this.state = this.mapState = mapStateToProps(context.store.getState())
                if (typeof mapDispatchToProps === 'function') {
                    this.actions = mapDispatchToProps(context.store.dispatch);
                } else if (typeof mapDispatchToProps === 'object') {
                    this.actions = bindActionCreators(mapDispatchToProps, context.store.dispatch);
                }
            }
            componentDidMount() {
                this.unsubscribe = this.context.store.subscribe(() => {
                    // combineReducer 优化每个reducer是否都发生了派发改变 prev/next
                    // 使用变量存储每次传入的值与之前的做比较
                    let nextState = mapStateToProps(this.context.store.getState());
                    if(nextState != this.mapState){
                        this.mapState = nextState // 如果不相同 得赋值覆盖否则永远就是第一次的值
                        this.setState(nextState)
                    }
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