import path from 'path';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import config from '../config';

const $ = gulpLoadPlugins();

export default function staticTask() {
    return gulp.src(path.join(config.static.src, '/**'))
        .pipe($.changed(config.static.dest))
        .pipe(gulp.dest(config.static.dest));
}
