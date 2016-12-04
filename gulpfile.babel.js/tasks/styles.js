import path from 'path';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import config from '../config';

const $ = gulpLoadPlugins();
const ENV_PRODUCTION = process.env.NODE_ENV === 'production';

const browsers = [
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
    return gulp.src(path.join(config.css.src, '/**/*.{sass,scss,css}'))
        .pipe($.if(!ENV_PRODUCTION, $.sourcemaps.init()))
        .pipe($.sass({
            precision: 10,
            indentedSyntax: true,
            includePaths: ['./node_modules/normalize.css'],
        })
        .on('error', $.sass.logError))
        .pipe($.postcss([autoprefixer({ browsers })]))
        .pipe($.if(ENV_PRODUCTION, $.postcss([cssnano({ autoprefixer: false })])))
        .pipe($.if(ENV_PRODUCTION, $.rev()))
        .pipe($.if(!ENV_PRODUCTION, $.sourcemaps.write()))
        .pipe(gulp.dest(config.css.dest))
        .pipe($.if(ENV_PRODUCTION, $.rev.manifest(path.join(config.root.dest, 'rev-manifest.json'), { merge: true })))
        .pipe($.if(ENV_PRODUCTION, gulp.dest('')))
        .pipe(browserSync.stream({ match: '**/*.css' }));
}
