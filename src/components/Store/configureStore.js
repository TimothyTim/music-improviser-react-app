import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../Reducers';
import thunk from 'redux-thunk';
import Config from '../../constants/Config.js';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

const DEV = Config.ENV === 'development';

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk, reduxImmutableStateInvariant()),
            window.devToolsExtension && DEV ? window.devToolsExtension() : f => f
        )
    );
}
