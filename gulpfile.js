var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var inlineCss = require('gulp-inline-css');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
        	port: 9000,
            baseDir: "build"
        }
    });

    gulp.watch('build/**/*').on('change', browserSync.reload);
});

// PUG
gulp.task('templates:compile', function buildHTML() {
  return gulp.src('source/template/index.pug')
  .pipe(pug({
    pretty:true
  }))
  .pipe(gulp.dest('build'))
});

//SASS
gulp.task('styles:compile', function () {
  return gulp.src('source/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css'));
});

// WATCH
gulp.task('watch', function(){
	gulp.watch('source/template/**/*.pug', gulp.series('templates:compile'));
	gulp.watch('source/styles/**/*.scss', gulp.series('styles:compile'));
});

// DEFAULT
gulp.task('default', gulp.series(
	gulp.parallel('templates:compile','styles:compile'),
	gulp.parallel('watch', 'server')
));





