import * as types from './actionTypes';

export function nextFrame(nextFrame) {
    return { type: types.NEXT_FRAME, nextFrame };
}
