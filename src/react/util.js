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
        return `<span data-id="${this._reactId}">${this._currentElement}</span>`
    }
}
// React对象创建元素
class NativeUnit extends Unit {
    getMarkUp(reactId) {
        this._reactId = reactId;
        let { type, props } = this._currentElement;
        let tagStart = `<${type} `;
        let tagCount = ''
        let tagEnd = `</${type}>`;
        for (let propName in props) {
            if (/^on[A-Z]/.test(propName)) {// 点击事件
                let eventName = propName.slice(2).toLowerCase();
                $(document).delegate(`[data-reactId="${this._reactId}"]`, `${eventName}.${this._reactId}`,props[propName])
            } else if (propName === 'style') {// 样式
                let styleObj = props[propName]
                let style = Object.entries(styleObj).map(([attr, value]) => { //backgroundColor -> background-color
                    return `${attr.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}:${value}`
                }).join(';')
                tagStart += (` style="${style}" `)
            } else if (propName === 'className') {// 类名
                tagCount += (` class="${props[propName]}" `)
            } else if (propName === 'children') {// 
                
            } else {//其他属性 直接赋值
                tagStart += (` ${propName} = ${props[propName]} `)
            }
        }
        return `${tagStart}>${tagCount}${tagEnd}`
    }
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
}

export {
    createUnit
};