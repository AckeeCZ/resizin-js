const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config');

const Visualizer = require('webpack-visualizer-plugin');

const PATHS = {
    stats: 'stats/index.html'
}

const developmemtnConfig = {
    plugins: [
        new Visualizer({
            filename: PATHS.stats,
        })
    ],
};

module.exports = merge(commonConfig, developmemtnConfig);
