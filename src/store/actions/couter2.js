import * as types from '../types'
function ADD(payload) {
    return { type: types.ADD2, payload }
}

function MINUS(payload) {
    return { type: types.MINUS2, payload }
}
export { ADD, MINUS }