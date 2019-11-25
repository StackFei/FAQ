export default function persistReducer(persistConfig, reducer) {
    let initialed = false;
    let { storage, key } = persistConfig
    return function (state, action) {
        switch (action.type) {
            case 'PERSIST_INIT':
                initialed = true;
                let value = storage.getState(key);
                if (value) {
                    // 巨坑, connect中做浅比较
                    // state = Object.assign(state, JSON.parse(value))
                    state = { ...state, ...JSON.parse(value) }
                }
                return reducer(state, action)
            default:
                if (initialed) {
                    state = reducer(state, action)
                    storage.setState(key, JSON.stringify(state))
                    return state
                }
                return reducer(state, action)
        }
    }
} 