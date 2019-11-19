import * as types from '../types'

function ADD(payload) {
    return { type: types.ADD1, payload }
}

function MINUS(payload) {
    return { type: types.MINUS1, payload }
}

export default { ADD, MINUS }