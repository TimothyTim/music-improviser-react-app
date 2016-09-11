import * as types from './actionTypes';

export function leadNote(leadNote) {
    return { type: types.LEAD_NOTE, leadNote };
}

export function leadNoteList(leadNoteList) {
    return { type: types.LEAD_NOTE_LIST, leadNoteList };
}
