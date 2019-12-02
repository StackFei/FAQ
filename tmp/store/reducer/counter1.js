import * as type from '../action-types';
export default function reducer(state = { number: 0 }, action) {
    switch (action.type) {
        case type.INCREMENT1:
            return { number: state.number + action.payload };
        case type.DECREMENT1:
            return { number: state.number - action.payload };
        default:
            return state;
    }
}