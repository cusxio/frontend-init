import webpack from 'webpack';
import webpackConfig from '../webpack';

const ENV_PRODUCTION = process.env.NODE_ENV === 'production';

export default function scripts(cb) {
    if (!ENV_PRODUCTION) {
        return;
    }

    webpack(webpackConfig, (err) => {
        if (err) {
            console.log(err);
        }
        cb();
    });
}
