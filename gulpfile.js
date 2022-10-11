const {src, dest, series, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const minifyCss = require('gulp-clean-css');

function compileSass() {
    return src('./src/scss/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(dest('./src/css'));
}

exports.default = compileSass;

exports.watch = function () {
    watch('./src/scss/*.scss', compileSass);
}