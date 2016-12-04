import path from 'path';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import config from '../config';

const $ = gulpLoadPlugins();
const ENV_PRODUCTION = process.env.NODE_ENV === 'production';

export default function html() {
    return gulp.src(path.join(config.html.src, '/**/*.html'))
        .pipe($.if(ENV_PRODUCTION, $.htmlmin({
            removeAttributeQuotes: true,
            removeComments: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeOptionalTags: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
        })))
        .pipe(gulp.dest(config.html.dest))
        .on('end', browserSync.reload);
}
