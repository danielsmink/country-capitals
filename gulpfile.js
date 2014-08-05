'us strict';

var gulp = require('gulp'),
    compass = require('gulp-compass'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    bytediff = require('gulp-bytediff'),
    stylish = require('jshint-stylish'),
    minifyCSS = require('gulp-minify-css');

require('gulp-help')(gulp);

// Compile compass
gulp.task('compass', function () {
  return gulp.src('./app/scss/**/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'public/css',
      sass: 'app/scss'
    }))
    // Minify CSS
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/css'));
});

// Run code through jshint
gulp.task('jshint', function () {
  return gulp.src('./app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

// Run jshint first
gulp.task('js', ['jshint'], function () {
  return gulp.src('./app/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('country-capitals.min.js', {newLine: ';'}))
    // Annotate before uglify so the code get's min'd properly.
    .pipe(ngAnnotate({
      // true helps add where @ngInject is not used. It infers.
      // Doesn't work with resolve, so we must be explicit there
      add: true
    }))
    .pipe(bytediff.start())
    .pipe(uglify({mangle: true}))
    .pipe(bytediff.stop())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/js'));
});