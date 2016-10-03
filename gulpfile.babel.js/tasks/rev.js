import path from 'path';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import config from '../config';

const $ = gulpLoadPlugins();

gulp.task('rev-assets', () => {
    const ignores = '!' + path.join(config.root.dest, '/**/*+(css|js|html|map)');

    return gulp.src([path.join(config.root.dest, '/**/*'), ignores])
        .pipe($.rev())
        .pipe(gulp.dest(config.root.dest))
        .pipe($.revNapkin({ verbose: false }))
        .pipe($.rev.manifest(path.join(config.root.dest, 'rev-manifest.json'), { merge: true }))
        .pipe(gulp.dest(''));
});

gulp.task('rev-assets-references-css-js', () => {
    const manifest = gulp.src(path.join(config.root.dest, 'rev-manifest.json'));

    return gulp.src([path.join(config.root.dest, '/**/**.{css,js}')])
        .pipe($.revReplace({ manifest: manifest }))
        .pipe(gulp.dest(config.root.dest));
});

gulp.task('rev-css-js', () => {
    return gulp.src([path.join(config.root.dest, '/**/**.{css,js,map}')])
        .pipe($.rev())
        .pipe(gulp.dest(config.root.dest))
        .pipe($.revNapkin({ verbose: false }))
        .pipe($.rev.manifest(path.join(config.root.dest, 'rev-manifest.json'), { merge: true }))
        .pipe(gulp.dest(''));
});

gulp.task('rev-css-js-references-html', () => {
    const manifest = gulp.src(path.join(config.root.dest, 'rev-manifest.json'));

    return gulp.src([path.join(config.root.dest, '/**/*.html')])
        .pipe($.revReplace({ manifest: manifest }))
        .pipe(gulp.dest(config.root.dest));
});

export default function rev(cb) {
    $.sequence('rev-assets', 'rev-assets-references-css-js', 'rev-css-js', 'rev-css-js-references-html', cb);
}
