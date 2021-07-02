const webpack = require("webpack");
const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );

// Builds bundle usable <script>. Includes RGL and all deps, excluding React.
module.exports = Object.assign(require('./webpack.config'), {
    plugins: [
        new NodePolyfillPlugin(),
        new HtmlWebPackPlugin({
            template: path.resolve( __dirname, 'example/index.html' ),
            filename: 'index.html'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'example'),
        compress: true,
        port: 9000,
    },
})
