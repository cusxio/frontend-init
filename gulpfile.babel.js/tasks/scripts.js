import webpack from 'webpack';
import webpackConfig from '../webpack';

const ENV_PRODUCTION = process.env.NODE_ENV === 'production';

export default function scripts(cb) {
    if (!ENV_PRODUCTION) {
        return;
    }

    webpack(webpackConfig, (err, stats) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        if (stats.hasErrors()) {
            console.error(stats.toString('errors-only'));
            process.exit(1);
        }
        cb();
    });
}
