import * as type from '../action-types';
export default function reducer(state = { number: 0 }, action) {
    switch (action.type) {
        case type.INCREMENT:
            return { number: state.number + action.payload };
        case type.DECREMENT:
            return { number: state.number - action.payload };
        default:
            return state;
    }
}