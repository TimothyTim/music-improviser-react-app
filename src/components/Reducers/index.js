import {combineReducers} from 'redux';
import clock from './clockReducer';

const rootReducer = combineReducers({
    clock: clock
});

export default rootReducer;
