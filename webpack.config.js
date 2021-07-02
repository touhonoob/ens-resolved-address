const webpack = require("webpack");
const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

// Builds bundle usable <script>. Includes RGL and all deps, excluding React.
module.exports = {
    mode: "production",
    entry: {
        "ens-resolved-address": "./src/index.js"
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.css$/i,
                exclude: /(node_modules|bower_components)/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
        ],
    },
    resolve: {
        extensions: ['.css', '.js', '.json', 'svg'],
    },
    output: {
        filename: 'ens-resolved-address.min.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "umd",
        library: "EnsResolvedAddress"
    },
    plugins: [
        new NodePolyfillPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
    ],
    externals: {
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "react",
            // React dep should be available as window.React, not window.react
            root: "React"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "react-dom",
            root: "ReactDOM"
        }
    },
};
