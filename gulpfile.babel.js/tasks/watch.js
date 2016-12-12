import gulp from 'gulp';
import config from '../config';

export default function watch() {
    gulp.watch(['**/*.{sass,scss,css}'], { cwd: config.css.src }, ['styles']);
    gulp.watch(['**/*.html'], { cwd: config.html.src }, ['html']);
    gulp.watch(['**/*.{jpg,png,svg,gif}'], { cwd: config.images.src }, ['images']);
}
