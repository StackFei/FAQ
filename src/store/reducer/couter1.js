
import * as type from '../types';
export default function reducer1(state = { number: 0 }, action) {
    switch (action.type) {
        case type.ADD1:
            return { number: state.number + action.payload };
        case type.MINUS1:
            return { number: state.number - action.payload };
        default:
            return state;
    }
}