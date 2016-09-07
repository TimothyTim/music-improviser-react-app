import React from 'react';
import { render } from 'react-dom';
import App from './components/App.js';
import configureStore from './components/Store/configureStore.js';
import {Provider} from 'react-redux';

const page = document.getElementById('page');
const store = configureStore();

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
