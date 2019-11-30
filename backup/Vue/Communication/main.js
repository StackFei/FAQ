import Vue from 'vue'
import App from './App'

// 向上无线查找 避免$parent.$parent......
Vue.prototype.$dispatch = function (eventName, value) {
    let parent = this.$parent;
    while (parent) {
        parent.$emit(eventName, value)
        parent = parent.$parent;
    }
}

// 向下无线查找 避免$parent.$parent......
Vue.prototype.$broadscat = function (eventName, value) {
    let children = this.$children;
    function broad(children) {
        children.forEach(child => {
            child.$emit(eventName, value)
            // 迭代递归
            if (child.$children) {
                broad(child.$children)
            }
        })
    }
    broad(children)
}

// 任意组件任意使用
Vue.prototype.$bus = new Vue()

new Vue({
    el: "#app",
    render: h => h(App)
})