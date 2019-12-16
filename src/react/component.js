class Component {
    constructor(props) {
        this.props = props
    }
    setState(newValue) {
        // console.log(this)
        // 文本 / 值
        this._currentUnit.update(null, newValue)
    }
}
export { Component }