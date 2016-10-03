import path from 'path';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import config from '../config';

const $ = gulpLoadPlugins();

export default function sizeReport() {
    const ignores = '!' + path.join(config.root.dest, '/**/*+(map|json)');

    return gulp.src([path.join(config.root.dest, '/**/*'), ignores])
        .pipe($.sizereport({ gzip: true }));
}
