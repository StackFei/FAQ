// 每次接受单个actions actionCreator为每次接受的派发动作函数
function bindActionCreator(actionCreator, dispatch) {
    return function (...args) {
        return dispatch(actionCreator(...args))
    }
}
export default function (actionCreators, dispatch) {
    if (actionCreators instanceof 'function') {
        return bindActionCreator(actionCreators, dispatch)
    }
    let args = [];
    for (const key in actionCreators) {
        args[key] = bindActionCreator(actionCreators[key], dispatch)
    }
    return args;
}