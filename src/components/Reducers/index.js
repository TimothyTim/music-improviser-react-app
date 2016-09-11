import {combineReducers} from 'redux';
import clock from './clockReducer';
import rhythm from './rhythmReducer';
import lead from './leadReducer';

const rootReducer = combineReducers({
    clock: clock,
    rhythm: rhythm,
    lead: lead
});

export default rootReducer;
