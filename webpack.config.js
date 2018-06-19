var webpack = require("webpack");
var path = require("path");

var DEV = path.resolve(__dirname, "app");
var OUTPUT = path.resolve(__dirname, "public");

var config = {
    entry: DEV + "/index.js",
    output: {
        path: OUTPUT,
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets:['es2015', 'react','stage-2']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    }
                ]
            },
        ]
    },

    watch:true
};

module.exports = config;