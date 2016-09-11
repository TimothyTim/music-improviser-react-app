import * as types from '../Actions/actionTypes';

export default function leadReducer(state = [], action) {
    switch(action.type) {
        case types.LEAD_NOTE:
            return Object.assign({}, state, action.leadNote);
        case types.LEAD_NOTE_LIST:
            return Object.assign({}, state, action.leadNoteList);
        default:
            return state;
    }
}
