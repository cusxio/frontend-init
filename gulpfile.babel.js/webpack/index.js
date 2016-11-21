import path from 'path';
import webpack from 'webpack';
import config from '../config';

const scriptsPaths = {
    src: path.join(config.root.src, config.js.src),
    dest: path.join(config.root.dest, config.js.dest),
};

// =====================================
//  ENVIRONMENT VARIABLES
// -------------------------------------

const NODE_ENV = process.env.NODE_ENV || 'development';
const ENV_DEVELOPMENT = NODE_ENV === 'development';
const ENV_PRODUCTION = NODE_ENV === 'production';

// =====================================
//  CONFIGURATIONS
// -------------------------------------

const webpackConfig = {};

webpackConfig.plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
];

webpackConfig.context = path.resolve(scriptsPaths.src);

webpackConfig.resolve = {
    modules: [
        path.resolve(scriptsPaths.src),
        'node_modules',
    ],
};

// =====================================
//  DEVELOPMENT or PRODUCTION
// -------------------------------------

if (ENV_DEVELOPMENT || ENV_PRODUCTION) {
    webpackConfig.entry = {
        app: ['./app.js'],
    };

    webpackConfig.output = {
        path: path.resolve(scriptsPaths.dest),
        filename: '[name].js',
        publicPath: '/scripts/',
    };
}

// =====================================
//  DEVELOPMENT
// -------------------------------------

if (ENV_DEVELOPMENT) {
    webpackConfig.devtool = 'cheap-module-source-map';

    webpackConfig.entry.app.unshift(
        'webpack-hot-middleware/client?reload=true'
    );

    webpackConfig.module = {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: [['es2015', { loose: true, modules: false }]],
            },
        }],
    };

    webpackConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}

// =====================================
//  PRODUCTION
// -------------------------------------

if (ENV_PRODUCTION) {
    webpackConfig.devtool = 'source-map';

    webpackConfig.module = {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: [['es2015', { loose: true, modules: false }]],
            },
        }],
    };

    webpackConfig.plugins.push(
        new webpack.optimize.DedupePlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            mangle: true,
            compress: {
                unused: true,
                dead_code: true,
                warnings: false,
            },
            comments: false,
        })
    );
}

export default webpackConfig;
