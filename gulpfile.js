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
    minifyCSS = require('gulp-minify-css'),
    paths = {
    scripts: './app/**/*.js',
    jsCompiled: 'public/js',
    scss: './app/scss/**/*.scss',
    scssDir: './app/scss',
    css: './public/css'
  };

require('gulp-help')(gulp);

// Compile compass
gulp.task('compass', 'Compiles compass', function () {
  return gulp.src(paths.scss)
    .pipe(compass({
      config_file: './config.rb',
      css: paths.css,
      sass: paths.scssDir
    }))
    // Minify CSS
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.css));
});

// Run code through jshint
gulp.task('jshint', false, function () {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

// Run jshint first
gulp.task('js', 'Minifies JavaScript files', ['jshint'], function () {
  return gulp.src(paths.scripts)
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
    .pipe(gulp.dest(paths.jsCompiled));
});

// Rerun the task when a file changes
gulp.task('watch', 'Watches JavaScript and sass files', function() {
  gulp.watch(paths.scripts, ['js']);
  gulp.watch(paths.scss, ['compass']);
});

// Default task
gulp.task('default', 'The default task :-)', ['watch', 'compass', 'js']);