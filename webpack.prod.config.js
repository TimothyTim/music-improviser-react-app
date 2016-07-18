const Webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const buildSource = path.resolve(__dirname, 'src/index.js');
const buildPath = path.resolve(__dirname, 'dist');
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false
};

module.exports = {
    entry: {
        app: buildSource
    },
    target: 'web',
    output: {
        path: buildPath,
        publicPath: '/',
        filename: "app_bundle.js"
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
            {
                test: /(\.css|\.scss)$/,
                include: path.join(__dirname, 'src/sass'),
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
            },

            // Load fonts
            { test: /\.(woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    plugins: [
        new Webpack.optimize.OccurenceOrderPlugin(),
        new Webpack.DefinePlugin(GLOBALS),
        new ExtractTextPlugin('styles.css', {
          publicPath: '/',
          allChunks: true
        }),
        new Webpack.optimize.DedupePlugin(),
        new Webpack.optimize.UglifyJsPlugin()
    ]
};
