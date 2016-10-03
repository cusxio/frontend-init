import path from 'path';
import gulp from 'gulp';
// import browserSync from 'browser-sync';
import config from '../config';

const glob = {
    scripts: path.join(config.root.src, config.css.src, '/**/*.{sass,scss,css}'),
    html: path.join(config.root.src, config.html.src, '/**/*.html'),
    images: path.join(config.root.src, config.images.src, '/**/*.{jpg,png,svg,gif}'),
};

export default function watch() {
    gulp.watch([glob.scripts], ['styles']);
    gulp.watch([glob.html], ['html']);
    gulp.watch([glob.images], ['images']);
}
