import { resolve, join } from 'path';
import webpack from 'webpack';

// =====================================
//  VARIABLES
// -------------------------------------

const dir = resolve('.');
const clientDir = join(dir, 'app', 'scripts');
const distDir = join(dir, 'public', 'scripts');
const nodeModulesDir = join(dir, 'node_modules');

const NODE_ENV = process.env.NODE_ENV || 'development';
const dev = NODE_ENV !== 'production';

// =====================================
//  CONFIGURATIONS
// -------------------------------------

const config = {};

config.devtool = dev ? '#cheap-module-eval-source-map' : '#source-map';

config.target = 'web';

config.plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': dev ? JSON.stringify('development') : JSON.stringify('production'),
    }),
];

config.context = clientDir;

config.resolve = {
    modules: [
        nodeModulesDir,
    ],
};

config.entry = {
    app: ['./app.js'],
};

config.output = {
    path: distDir,
    filename: '[name].js',
    publicPath: '/scripts/',
};

config.module = {
    loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
            presets: [['es2015', { loose: true, modules: false }], 'stage-0'],
            babelrc: false,
        },
    }],
};

config.resolveLoader = {
    modules: [
        nodeModulesDir,
    ],
};

if (dev) {
    config.entry.app.unshift(
        'webpack-hot-middleware/client?reload=true'
    );

    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    );
} else {
    config.plugins.push(
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

export default config;
