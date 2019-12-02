import React, { Component } from 'react'

export default class index extends Component {
    state = { number: 0 }
    handle = () => {
        // 基操
        // this.setState({ number: this.state.number + 1 })
        // this.setState({ number: this.state.number + 1 })
        // this.setState({ number: this.state.number + 1 })

        // 第一种方式
        this.setState((pervState) => ({ number: pervState.number + 1 }))
        this.setState((pervState) => ({ number: pervState.number + 2 }))
        this.setState((pervState) => ({ number: pervState.number + 3 }))
        console.log(this.state.number)

        // 第二种
        this.setState({ number: this.state.number + 1 }, () => {
            this.setState({ number: this.state.number + 1 }, () => {
                this.setState({ number: this.state.number + 1 })
            })
        })
    }
    render() {
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={this.handle}>+</button>
            </div>
        )
    }
}
