import browserSync from 'browser-sync';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack';

export default function bs() {
    const compiler = webpack(webpackConfig);
    console.log(webpackConfig.output.publicPath);
    browserSync.init({
        server: ['public'],
        notify: false,
        port: 8080,
        logPrefix: 'F-Init',
        middleware: [
            devMiddleware(compiler, {
                publicPath: webpackConfig.output.publicPath,
                quiet: true,
                noInfo: true,
                stats: {
                    colors: true,
                },
            }),
            hotMiddleware(compiler),
        ],
    });
}
