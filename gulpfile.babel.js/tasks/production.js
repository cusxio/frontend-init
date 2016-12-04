import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

export default function production(cb) {
    $.sequence('clean', ['images', 'scripts'], ['html', 'styles'], 'rev', 'static', 'size-report', cb);
}
