var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var rename = require('gulp-rename');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var cleanCSS = require('gulp-clean-css');

gulp.task('watch',function() {
    gulp.watch('jsx/*.jsx',['bundle']);
    gulp.watch('scss/*.scss',['sass']);
});

gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('httpdocs/css'));
});

gulp.task('bundle', function() {
    return browserify({
        extensions: ['.jsx','js'],
        entries: ['jsx/admin.jsx'],
    })
    .transform(babelify.configure({
        presets: ["es2015","react"]
    }))
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('bundle.js'))
    .pipe(rename({basename: 'admin'}))
    .pipe(gulp.dest('httpdocs/js'));
});