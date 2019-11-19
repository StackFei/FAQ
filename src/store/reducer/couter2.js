
import * as type from '../types';
export default function reducer2(state = { number: 0 }, action) {
    switch (action.type) {
        case type.ADD2:
            return { number: state.number + action.payload };
        case type.MINUS2:
            return { number: state.number - action.payload };
        default:
            return state;
    }
}