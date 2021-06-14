const concat = require('concat-stream');
const {src, dest, series, parallel} = require('gulp');
const GulpUglify = require('gulp-uglify');

function scriptAdd() {
  return src('src/*.js')
    .pipe(dest('dist/scripts'));
};

function htmlAdd() {
  return src('src/*.html').pipe(dest('dist/html'));
}
exports.default = parallel(scriptAdd, htmlAdd);
