const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');

const pkg = require('../package.json');

const BASE_BUILD_PATH = 'www';
const BUILD_FOLDER = 'build';

const PATHS = {
    app: path.join(__dirname, '..', 'src/'),
    build: path.join(__dirname, '..', BASE_BUILD_PATH, BUILD_FOLDER),
    public: path.posix.join('/', BUILD_FOLDER, '/'),
};

const commonConfig = {
    entry: {
        app: PATHS.app,
    },
    output: {
        path: '',
        filename: 'index.js',
        publicPath: PATHS.public,
        library: 'jstasklib',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react', 'stage-1'],
                            compact: false,
                        },
                    },
                    
                ],
            }
        ],
    },
    externals: {
        'isomorphic-fetch': {
            root: 'isomorphic-fetch',
            commonjs2: 'isomorphic-fetch',
            commonjs: 'isomorphic-fetch',
            amd: 'isomorphic-fetch'
        },
        'form-data': {
            root: 'form-data',
            commonjs2: 'form-data',
            commonjs: 'form-data',
            amd: 'form-data'
        }
    },
    node: {
        fs: "empty",
        Buffer: false,
        net: 'empty',
        tls: 'empty',
        dns: 'empty',
    },
};

const prodConfig = {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
    ],
    devtool: 'source-map',
};

module.exports = merge(commonConfig, prodConfig);
