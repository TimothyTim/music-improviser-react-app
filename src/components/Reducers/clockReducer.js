import * as types from '../Actions/actionTypes';

export default function clockReducer(state = [], action) {
    switch(action.type) {
        case types.NEXT_TICK:
            return Object.assign({}, state, action.nextTick);
        case types.NEXT_FRAME:
            return Object.assign({}, state, action.nextFrame);
        case types.IS_TICKING:
            return Object.assign({}, state, action.isTicking);
        case types.TEMPO:
            return Object.assign({}, state, action.tempo);
        default:
            return state;
    }
}
