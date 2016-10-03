import path from 'path';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import config from '../config';

const $ = gulpLoadPlugins();

const staticPaths = {
    src: path.join(config.root.src, config.static.src, '/**'),
    dest: path.join(config.root.dest, config.static.dest),
};

export default function staticTask() {
    return gulp.src(staticPaths.src)
        .pipe($.changed(staticPaths.dest))
        .pipe(gulp.dest(staticPaths.dest));
}
