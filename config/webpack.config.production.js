const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config');

const productionConfig = {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
    ],
    devtool: 'source-map',
};

module.exports = merge(commonConfig, productionConfig);
