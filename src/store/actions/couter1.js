import * as types from '../types'

function increment(payload) {
    return { type: types.INCREMENT1, payload }
}

function decrement(payload) {
    return { type: types.DECREMENT1, payload }
}

export default { increment, decrement }