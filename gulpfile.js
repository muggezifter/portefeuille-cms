var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var rename = require('gulp-rename');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var cleanCSS = require('gulp-clean-css');
var merge = require('merge-stream');

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

gulp.task('install_react', function(){
    return gulp.src(['node_modules/react/dist/react.min.js',
        'node_modules/react-dom/dist/react-dom.min.js'])
    .pipe(gulp.dest('httpdocs/js'));
});

gulp.task('install_pure_css', function(){
    return gulp.src(['node_modules/purecss/build/pure-min.css',
        'node_modules/purecss/build/grids-responsive-min.css',
        'node_modules/purecss/build/grids-responsive-old-ie-min.css'])
    .pipe(gulp.dest('httpdocs/css'));
});

gulp.task('install_font_awesome', function(){
    var copyFonts = gulp.src('node_modules/font-awesome/fonts/*.*')
    .pipe(gulp.dest('httpdocs/fonts/FontAwesome'));
    var copyCss = gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('httpdocs/css'));
    return merge(copyFonts,copyCss);
});

gulp.task('install',['install_react','install_pure_css','install_font_awesome']);

gulp.task('build',['install','sass','bundle']);