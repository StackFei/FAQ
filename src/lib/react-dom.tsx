import { ReactElement,FunctionComponent,Component } from './react';

function render(element: ReactElement, container: HTMLElement): any {
    // {type:'h1',props:{children:['hello','word'],className:"title",style:{color:'red',fontSize:40}}}
    if (typeof element === 'string') {
        return container.appendChild(document.createTextNode(element))
    }
    let props, type: any | FunctionComponent| Component;
    type = element.type;
    props = element.props;
    let createDom: HTMLElement;
    // 函数式组件
    if ((type as Component).isReactComponent) {
        let cType:any = type as any;
        element = new cType(props).render()
        type = element.type;
        props = element.props;
    }else if (typeof type === 'function') {
        element = type(props) // 返回新的需要渲染的元素
        type = element.type;
        props = element.props;
    }  
    createDom = document.createElement(type as string);

    for (let propName in props) {
        if (propName === 'className') {
            createDom.className = props[propName]
        } else if (propName === 'style') {
            let styleObject: CSSStyleDeclaration = props.style;
            for (let attr in styleObject) { //color:red;font-size:20
                createDom.style[attr] = styleObject[attr]
            }
            // let cssText = Object.keys(props.style).map((attr: string) => {
            //     return (attr.replace(/([A-Z])/g, function () {
            //         return '-' + arguments[1].toLowerCase()
            //     })) + ':' + props.style[attr]
            // }).join(';') // color:red;font-size:20
            // createDom.style.cssText = cssText;
        } else if (propName === 'children') {
            props.children.forEach((child: any) => {
                render(child, createDom)
            })
        } else {
            // id: xxx  data: xxx
            createDom.setAttribute(propName, props[propName])
        }
    }
    container.appendChild(createDom)
}
export default { render }