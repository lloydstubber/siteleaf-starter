// Requirement for autoprefixer
require('es6-promise').polyfill();

// Requires
const gulp = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

// Sass
gulp.task('sass', () => {
  return gulp.src('_assets/styles/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/styles/'))
    .pipe(browserSync.stream())
});

// ES6 Support/Minify
gulp.task('js', () => {
  gulp.src('_assets/scripts/*.js')
      .pipe(babel({
        presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('assets/scripts/'))
});

// Vendor Concat/Minify
gulp.task('vendor', () => {
  return gulp.src('_assets/scripts/vendor/*.js')
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/scripts/'));
});

// Watcher
gulp.task('watch', () => {
  gulp.watch('_assets/styles/partials/*.scss', ['sass']);
  gulp.watch('_assets/scripts/*.js', ['js']);
  gulp.watch('_assets/scripts/vendor/*.js', ['vendor']);
  // Example with hot reload
  // gulp.watch('src/js/*.js', ['js']).on('change', reload);
});

// Browsersync - Coming soon
// gulp.task('serve', () => {
//   // Serve files from the root of this project
//   browserSync.init({
//     server: {
//       baseDir: "./"
//     },
//     tunnel: false // True for unique testing link
//   });

//   gulp.watch("*.html").on("change", reload);
// });

// Run tasks on 'gulp'
gulp.task('default', ['sass', 'watch', 'js', 'vendor']);