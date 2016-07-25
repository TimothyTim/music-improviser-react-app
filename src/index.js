import React from 'react';
import { render } from 'react-dom';
import App from './components/App.js';
const page = document.getElementById('page');

require('./utils/Google.js').init();
require('font-awesome-webpack');
require('!style!css!autoprefixer!sass!./sass/styles.scss');

// Render App
render (
    <App />,
    page
);
