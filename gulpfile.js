/*
 *  DT173G - Moment 3 (Del 2)
 *  Fredrik Blank
 */
 
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify_js = require('gulp-uglify');
const uglify_css = require('gulp-uglifycss');

/*
 *  Slå ihop JavaScript och minifiera
 *  Spara både i src- och pub-mappen
 */
gulp.task('concatjs', function() {
    var task = gulp.src(['src/js/*.js', '!src/js/*.min.js'])
        .pipe(concat('site.min.js'))
        .pipe(uglify_js())
        .pipe(gulp.dest('src/js'))
        .pipe(gulp.dest('pub/js'));

    return task;
});

/*
 *  SASS-funktionalitet.
 *  Kör denna före annan CSS-hantering
 */
gulp.task('sass', function() {
    var task = gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
        .pipe(gulp.dest('src/pub'));

    return task;
});

/*
 *  Slå ihop CSS och minifiera
 *  Spara både i src- och pub-mappen
 */
gulp.task('concatcss', function() {
    var task = gulp.src(['src/css/*.css', '!src/css/*.min.css'])
        .pipe(concat('site.min.css'))
        .pipe(uglify_css())
        .pipe(gulp.dest('src/css'))
        .pipe(gulp.dest('pub/css'));

    return task;
});

/*
 *  Kopiera över HTML-filer till pub
 */
gulp.task('copyhtml', function() {
    var task = gulp.src('src/*.html')
        .pipe(gulp.dest('pub/'));

    return task;
});

/*
 *  Kopiera över bilder till pub
 */
gulp.task('copyimages', function() {
    var task = gulp.src('src/img/*')
        .pipe(gulp.dest('pub/img'));

    return task;
});

/*
 *  Övervaka filändringar
 */
gulp.task('watcher', function() {
    gulp.watch('src/js/*.js', ['concatjs']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/css/*.css', ['concatcss']);
    gulp.watch('src/*.html', ['copyhtml']);
    gulp.watch('src/img/*', ['copyimages']);
});

/*
 *  Kör alla tasks som default.
 */
gulp.task('default', ['concatjs', 'sass', 'concatcss', 'copyhtml', 'copyimages', 'watcher']);