import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

export default function production(cb) {
    $.sequence('clean', ['images'], ['html', 'styles', 'scripts'], 'rev', 'size-report', 'static', cb);
}
