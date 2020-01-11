import { createUnit } from './util'
import { createElement } from './element'
import { Component } from './component'
import $ from 'jquery'
let React = {
    render,
    createElement,
    Component
}
function render(element, container) {
    // 创建每个组件单元实例
    let unit = createUnit(element);
    // 每个标签html的标记位
    let markUp = unit.getMarkUp('0')
    container.innerHTML = markUp;
    $(document).trigger('mounted')
}

export default React;