import path from 'path';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import config from '../config';

const $ = gulpLoadPlugins();
const ENV_PRODUCTION = process.env.NODE_ENV === 'production';

const htmlPaths = {
    src: path.join(config.root.src, config.html.src, '/**/*.html'),
    dest: path.join(config.root.dest, config.html.dest),
};

export default function html() {
    return gulp.src(htmlPaths.src)
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
        .pipe(gulp.dest(htmlPaths.dest))
        .on('end', browserSync.reload);
}
