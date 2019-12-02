import * as types from '../action-types'

function increment(payload) {
    return { type: types.INCREMENT, payload }
}

function asyncIncrement(payload) {
    return function (getState, dispatch) {
        setTimeout(() => {
            dispatch({ type: types.INCREMENT, payload })
        }, 1000)
    }
}

function promiseIncrement(payload) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ type: types.INCREMENT, payload })
        }, 1000)
    })
}

function decrement(payload) {
    return { type: types.DECREMENT, payload }
}

export default { increment, decrement, asyncIncrement, promiseIncrement }