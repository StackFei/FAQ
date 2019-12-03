import { ReactElement, FunctionComponent, Component } from './react';
/**
 * 
 * @param type 元素类型
 * @param config  配置元素
 * @param children  子元素 
 */
function createElement(type: string |FunctionComponent |Component, config: Record<string, any>, ...children: Array<any>): ReactElement {
    let propName: string;//属性名
    let props: Record<string, any> = {};//任意类型
    // 迭代出属性
    for (propName in config) {
        props[propName] = config[propName]
    }
    // 过滤出所有的子元素
    // const childrenLength = arguments.length - 2;
    // if (childrenLength == 1) {
    //     props.children = children
    // } else {//截取后面的所有子元素
    //     props.children = Array.prototype.slice.call(arguments, 2)
    // }
    props.children = children;
    let element: ReactElement = { type, props }
    return element
}

export default createElement;