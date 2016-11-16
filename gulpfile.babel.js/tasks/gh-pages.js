import path from 'path';
import gulp from 'gulp';
import pages from 'gulp-gh-pages';
import config from '../config';

export default function ghPages() {
    const ignores = `!${path.join(config.root.dest, '/**/*+(map|json)')}`;

    return gulp.src([path.join(config.root.dest, '/**/*'), ignores])
        .pipe(pages());
}
