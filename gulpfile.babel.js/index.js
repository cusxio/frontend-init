import gulp from 'gulp';
import tasks from './tasks';

gulp.task('default', tasks.defaultTask);

gulp.task('clean', tasks.clean);

gulp.task('styles', tasks.styles);

gulp.task('scripts', tasks.scripts);

gulp.task('html', tasks.html);

gulp.task('images', tasks.images);

gulp.task('static', tasks.staticTask);

gulp.task('rev', tasks.rev);

gulp.task('size-report', tasks.sizeReport);

gulp.task('browserSync', tasks.browserSync);

gulp.task('watch', ['browserSync'], tasks.watch);

gulp.task('production', tasks.production);

gulp.task('deploy:gh-pages', tasks.ghPages);

