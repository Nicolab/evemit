/**
 * Evemit build tasks
 * @author Nicolas Tallefourtane <dev@nicolab.net>
 * @link https://github.com/Nicolab/evemit
 */
'use strict';

var gulp       = require('gulp');
var uglify     = require('gulp-uglify');
var header     = require('gulp-header');
var rename     = require('gulp-rename');
var livereload = require('gulp-livereload');
var gwebpack   = require('gulp-webpack');
var webpack    = require('webpack');
var pkg        = require('./package.json');

var webpackConf = {

  entry: {
    main: './test/test.js',
  },

  output: {
    filename: 'test-webpacked.js',
  },

  externals: {
    'unit.js': 'unitjs'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
  ]
};


/*----------------------------------------------------------------------------*\
  Tasks
\*----------------------------------------------------------------------------*/

// build prod
gulp.task('build', function() {

  return gulp.src('./evemit.js')
    .pipe(uglify())
    .pipe(header('/*! '+ pkg.name + ' v'+ pkg.version + ' | '+ pkg.licenses[0].type +
      ' (c) '+ (new Date().getFullYear()) +' ' + pkg.author.name + ' - ' + pkg.homepage +' */'))
    .pipe(rename(function(path) {
      path.basename = 'evemit.min';
    }))
    .pipe(gulp.dest('./'));
});

// Build Unit tests
gulp.task('build-test', function() {

  return gulp.src('./test/test.js')
    .pipe(gwebpack(webpackConf))
    .pipe(rename(function(path) {
      path.basename = 'test-webpacked';
    }))
    .pipe(gulp.dest('./test/'));
});

// dev watch changes
gulp.task('watch', function() {

  livereload.listen();

  gulp.watch('./test/test.js', ['build-test'])
    .on('change', livereload.changed);

  gulp.watch('./evemit.js', ['build'])
    .on('change', livereload.changed);
});

// bundles
gulp.task('dev', ['build', 'build-test', 'watch']);
gulp.task('default', ['build', 'build-test']);
