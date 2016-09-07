import * as types from './actionTypes';

export function nextTick(nextTick) {
    return { type: types.NEXT_TICK, nextTick };
}
