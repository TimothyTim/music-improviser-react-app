import React from 'react';
import { render } from 'react-dom';
import App from './components/App.js';
import configureStore from './components/Store/configureStore.js';
import {Provider} from 'react-redux';
import {nextTick, isTicking} from './components/Actions/clockActions.js';

const page = document.getElementById('page');
const store = configureStore();
const rhythmicPosition = {
    barIndex: 3, //count in
    beatIndex: 4,
    subBeatIndex: 4
};

store.dispatch(nextTick({nextTick: rhythmicPosition}));
store.dispatch(isTicking({isTicking: false}));

require('./utils/Google.js').init();
require('font-awesome-webpack');
require('!style!css!autoprefixer!sass!./sass/styles.scss');

// Render App
render (
    <Provider store={store}>
      <App />
    </Provider>,
    page
);
