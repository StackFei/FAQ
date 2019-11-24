import * as types from '../action-types'

function increment(payload) {
    return { type: types.INCREMENT2, payload }
}

function decrement(payload) {
    return { type: types.DECREMENT2, payload }
}

export default { increment, decrement }