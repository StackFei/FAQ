import { createUnit } from './util'
import { createElement } from './element'
let React = {
    render,
    createElement
}
function render(element, container) {
    // 创建每个组件单元实例
    let unit = createUnit(element);
    // 每个标签html的标记位
    let markUp = unit.getMarkUp('0')
    container.innerHTML = markUp;
}

export default React;