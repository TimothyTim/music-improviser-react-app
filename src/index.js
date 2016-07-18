import App from './components/App.js';

require('./utils/Google.js').init();
require('font-awesome-webpack');
require('!style!css!autoprefixer!sass!./sass/styles.scss');

// Start App
new App();
