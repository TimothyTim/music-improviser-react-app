import * as types from '../Actions/actionTypes';

export default function frameReducer(state = [], action) {
    switch(action.type) {
        case types.NEXT_FRAME:
            return Object.assign({}, state, action.nextFrame);
        default:
            return state;
    }
}
