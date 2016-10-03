import path from 'path';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import config from '../config';

const $ = gulpLoadPlugins();
const ENV_PRODUCTION = process.env.NODE_ENV === 'production';

const stylesPaths = {
    src: path.join(config.root.src, config.css.src, '/**/*.{sass,scss,css}'),
    dest: path.join(config.root.dest, config.css.dest),
};

const browser = [
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ie >= 10',
    'ie_mob >= 10',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10',
];

export default function styles() {
    return gulp.src(stylesPaths.src)
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            precision: 10,
            indentedSyntax: true,
            includePaths: ['./node_modules/normalize.css'],
        })
        .on('error', $.sass.logError))
        .pipe($.postcss([autoprefixer({ browser })]))
        .pipe($.if(ENV_PRODUCTION, $.postcss([cssnano({ autoprefixer: false })])))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(stylesPaths.dest))
        .pipe(browserSync.stream({ match: '**/*.css' }));
}
