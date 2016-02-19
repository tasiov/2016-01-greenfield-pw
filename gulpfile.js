var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglifyjs')
 
gulp.task('build', function () {
  browserify({
    entries: 'client/index.jsx',
    extensions: ['.jsx', '.js'],
    debug: true
  })
  .transform('babelify', {
    presets: ['es2015','react'],
    extensions: ['.es6', '.jsx']
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('client/dist'));
});

// gulp.task('prepareDeps', function() {
//   return gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/lodash/lodash.js'])
//   .pipe(uglify())
//   .pipe(gulp.dest('client/dist'));
// });
 
gulp.task('default', ['build']);