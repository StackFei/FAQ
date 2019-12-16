/* eslint-disable no-loop-func */
import { Element, createElement } from './element';
import $ from 'jquery'
class Unit {
    constructor(element) {
        this._currentElement = element
    }
    getMarkUp() {
        throw Error('抽象类无法被实例化')
    }
}
// 文本
class TextUnit extends Unit {
    getMarkUp(reactId) {
        this._reactId = reactId
        return `<span data-reactId="${this._reactId}">${this._currentElement}</span>`
    }
    update(nextElement) {
        if (this._currentElement !== nextElement) {
            this._currentElement = nextElement
            console.log(nextElement)
            $(`[data-reactId="${this._reactId}"]`).html(this._currentElement)
        }
    }
}
// React对象创建元素
class NativeUnit extends Unit {
    getMarkUp(reactId) {
        this._reactId = reactId;
        let { type, props } = this._currentElement;
        let tagStart = `<${type} data-reactId="${this._reactId}"`;
        let tagCount = ''
        let tagEnd = `</${type}>`;
        for (let propName in props) {
            if (/^on[A-Z]/.test(propName)) {// 点击事件
                let eventName = propName.slice(2).toLowerCase();
                $(document).delegate(`[data-reactId="${this._reactId}"]`, `${eventName}.${this._reactId}`, props[propName])
            } else if (propName === 'style') {// 样式
                let styleObj = props[propName]
                let style = Object.entries(styleObj).map(([attr, value]) => { //backgroundColor -> background-color
                    return `${attr.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}:${value}`
                }).join(';')
                tagStart += (` style="${style}" `)
            } else if (propName === 'className') {// 类名
                tagCount += (` class="${props[propName]}" `)
            } else if (propName === 'children') {// 
                let children = props[propName];
                children.forEach((child, index) => {
                    let childUnit = createUnit(child);
                    let childMarkUp = childUnit.getMarkUp(`${this._reactId}.${index}`);
                    tagCount += childMarkUp;
                });
            } else {//其他属性 直接赋值
                tagStart += (` ${propName} = ${props[propName]} `)
            }
        }
        return `${tagStart}>${tagCount}${tagEnd}`
    }
}

class CompositeUnit extends Unit {
    // 组件跟新
    update(nextElement, preState) {
        // 新元素
        this._currentElement = nextElement || this._currentElement;
        // 新状态
        let nextState = this._componentInstance.state = Object.assign(this._componentInstance.state, preState)
        // 新的属性对象
        let nextProps = this._currentElement.props;
        if (this._componentInstance.shouldComponentUpdate && !this._componentInstance.shouldComponentUpdate(nextProps, nextState)) {
            return;
        }
        // 获取上次渲染单元 比较
        let preRenderUnitInstance = this._renderUnitInstance;
        // 上下次渲染的元素
        let preRenderElement = preRenderUnitInstance._currentElement;
        let nextRenderElement = this._componentInstance.render()
        console.log(this)
        // debugger
        // 深度比较是否复用 --- react v15 子节点/父节点 类型不相同直接删掉
        if (shouldDeepCompare(preRenderElement, nextRenderElement)) {
            // 使用上一次的element来更新状态 text
            console.log(nextRenderElement)
            preRenderUnitInstance.update(nextRenderElement);
            this._componentInstance.componentDidUpdate && this._componentInstance.componentDidUpdate()
        } else {
            this._renderUnitInstance = createUnit(nextRenderElement);
            let nextMarkUp = this._renderUnitInstance.getMarkUp()
            $(`[data-reactId="${this._reactId}"]`).replaceWith(nextMarkUp)
        }
    }
    getMarkUp(reactId) {
        this._reactId = reactId;
        let { type: Component, props } = this._currentElement;
        let componentInstance = this._componentInstance = new Component(props);
        // 组件实例的currentUnit 为当前实例
        componentInstance._currentUnit = this;
        //某些生命周期
        componentInstance.componentWillMount && componentInstance.componentWillMount()
        let renderElement = componentInstance.render();
        let renderUnitInstance = this._renderUnitInstance = createUnit(renderElement);
        let renderMarkUp = renderUnitInstance.getMarkUp(this._reactId)
        //某些生命周期在挂在之后执行
        $(document).on('mounted', () => {
            componentInstance.componentDidMount && componentInstance.componentDidMount()
        })
        return renderMarkUp
    }
}

function shouldDeepCompare(oldElement, newElement) {
    if (oldElement != null && newElement != null) {
        let oldType = typeof oldElement;
        let newType = typeof newElement;
        if ((oldType === 'string' || oldType === 'number') && (newType === 'string' || newType === 'number')) {
            return true
        }
        if (oldElement instanceof Element && newElement instanceof Element) {
            return oldElement.type == newElement.type
        }
    }
    return false
}

function createUnit(element) {
    // 文本
    if (typeof element === 'string' || typeof element === 'number') {
        return new TextUnit(element)
    }
    // React对象元素、不包含直接渲染组件
    if (element instanceof Element && typeof element.type === 'string') {
        return new NativeUnit(element)
    }
    // React组件
    if (element instanceof Element && typeof element.type === 'function') {
        return new CompositeUnit(element)
    }
}

export {
    createUnit
};