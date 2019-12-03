import createElement from './element';
export  class Component<P = any>{
    // 类组件标识
    isReactComponent = true;
    static isReactComponent =true;
    public props: P;
    constructor(props: P) {
        this.props = props
    }
}
export default {
    createElement,
    Component
}

export * from './types';