import * as types from '../Actions/actionTypes';

export default function rhythmReducer(state = [], action) {
    switch(action.type) {
        case types.IS_COUNT_IN:
            return Object.assign({}, state, action.isCountIn);
        default:
            return state;
    }
}
