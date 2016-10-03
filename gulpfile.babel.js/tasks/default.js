import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

export default function defaultTask(cb) {
    $.sequence('clean', ['images'], ['html', 'styles'], 'static', 'watch', cb);
}
