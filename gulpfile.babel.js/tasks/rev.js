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

gulp.task('rev-assets-update-references', () => {
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

gulp.task('rev-css-js-update-references', () => {
    function replaceMap(filename) {
        if (filename.indexOf('.css.map') > -1) {
            return filename.replace('styles/', '');
        }
        return filename.replace('scripts/', '');
    }

    const manifest = gulp.src(path.join(config.root.dest, 'rev-manifest.json'));

    return gulp.src([path.join(config.root.dest, '/**/**.{html,css,js}')])
        .pipe($.revReplace({
            manifest: manifest,
            modifyUnreved: replaceMap,
            modifyReved: replaceMap,
        }))
        .pipe(gulp.dest(config.root.dest));
});

export default function rev(cb) {
    $.sequence('rev-assets', 'rev-assets-update-references', 'rev-css-js', 'rev-css-js-update-references', cb);
}
