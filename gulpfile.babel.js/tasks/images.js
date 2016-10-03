import path from 'path';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import config from '../config';

const $ = gulpLoadPlugins();
const ENV_PRODUCTION = process.env.NODE_ENV === 'production';

const imagesPaths = {
    src: path.join(config.root.src, config.images.src, '/**/*.{jpg,png,svg,gif}'),
    dest: path.join(config.root.dest, config.images.dest),
};

export default function images() {
    return gulp.src(imagesPaths.src)
        .pipe($.changed(imagesPaths.dest))
        .pipe($.if(ENV_PRODUCTION, $.imagemin({
            progressive: true,
            interlaced: true,
        })))
        .pipe(gulp.dest(imagesPaths.dest))
        .pipe(browserSync.stream());
}
