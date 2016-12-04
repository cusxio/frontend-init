import path from 'path';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import config from '../config';

const $ = gulpLoadPlugins();
const ENV_PRODUCTION = process.env.NODE_ENV === 'production';

export default function images() {
    return gulp.src(path.join(config.images.src, '/**/*.{jpg,png,svg,gif}'))
        .pipe($.changed(config.images.dest))
        .pipe($.if(ENV_PRODUCTION, $.imagemin({
            progressive: true,
            interlaced: true,
        })))
        .pipe(gulp.dest(config.images.dest))
        .pipe(browserSync.stream());
}
