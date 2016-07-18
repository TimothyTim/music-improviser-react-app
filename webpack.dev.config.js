const Webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'dist');
const buildSource = path.resolve(__dirname, 'src/index.js');
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  __DEV__: true
};

module.exports = {
    debug: true,
    entry: {
        app: [
            'webpack-hot-middleware/client?reload=true',
            buildSource
        ]
    },
    target: 'web',
    output: {
        path: buildPath,
        publicPath: 'http://localhost:3000/',
        filename: "[name]_bundle.js"
    },
    module: {
        loaders: [
            // Load ES6/JSX
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'react']
                }
            },

            // json
            { test: /\.json$/, loader: "json-loader" },

            // Load css
            { test: /\.css$/, loader: "style!css" },
            { test: /\.scss$/, loaders: [ "style", "css", "sass" ] },

            // Load fonts
            { test: /\.(woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    plugins: [
        new Webpack.DefinePlugin(GLOBALS), // Tells React to build in dev mode. https://facebook.github.io/react/downloads.htmlnew webpack.HotModuleReplacementPlugin());
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NoErrorsPlugin()
    ]
};
