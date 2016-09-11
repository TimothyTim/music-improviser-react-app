import {combineReducers} from 'redux';
import clock from './clockReducer';
import rhythm from './rhythmReducer';
import lead from './leadReducer';
import frame from './frameReducer';

const rootReducer = combineReducers({
    clock: clock,
    rhythm: rhythm,
    lead: lead,
    frame: frame
});

export default rootReducer;
