// Requirement for autoprefixer
require('es6-promise').polyfill();

// Requires
const gulp = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const through2 = require('through2');

// Sass
gulp.task('sass', gulp.series((done) => {
  return gulp.src('_assets/styles/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(through2.obj(function(file, enc, cb) {
      var date = new Date();
      file.stat.atime = date;
      file.stat.mtime = date;
      cb(null, file);
    }))
    .pipe(gulp.dest('assets/styles/'));
    done();
}));

// ES6 Support/Minify
gulp.task('js', gulp.series((done) => {
  gulp.src('_assets/scripts/*.js')
      .pipe(babel({
        presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('assets/scripts/'));
    done();
}));

// Vendor Concat/Minify
gulp.task('vendor', gulp.series((done) => {
  return gulp.src('_assets/scripts/vendor/*.js')
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/scripts/'));
    done();
}));

// Watcher
gulp.task('watch', () => {
  gulp.watch('_assets/styles/partials/*.scss', gulp.series('sass'));
  gulp.watch('_assets/scripts/*.js', gulp.series('js'));
  gulp.watch('_assets/scripts/vendor/*.js', gulp.series('vendor'));
} );

// Run tasks on 'gulp'
gulp.task('default',
  gulp.parallel('watch', 'sass', 'js', 'vendor')
);