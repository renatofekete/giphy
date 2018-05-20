const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')

gulp.task('html', function () {
  gulp.src('src/index.html')
    .pipe(gulp.dest('docs'));
});
// Javascript
gulp.task('js', function () {
  gulp.src('src/js/app.js')
    .pipe(
      babel({
        presets: "es2015"
      })
    )
    .pipe(uglify().on("error", function (e) {
      console.log(e);
    }))
    .pipe(gulp.dest('docs/js'));
})
// Sass
gulp.task('sass', function () {
  gulp.src('src/scss/style.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('docs/css'));
})

gulp.task('default', ['html', 'js', 'sass']);

gulp.task('watch', function () {
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/js/app.js', ['js']);
});