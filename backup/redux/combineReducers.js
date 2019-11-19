export default function combineReducers(reducers) {
    return function (state = {}, action) {
        let nextState = {}
        for (const key in reducers) {
            nextState[key] = reducers[key](state[key], action)
        }
    }
}