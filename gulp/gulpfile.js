/**
 * Created by m on 2017/5/27.
 */
var gulp=require('gulp'),
    uglify=require('gulp-uglify'),
    concat=require('gulp-concat'),
    server=require('gulp-webserver');
gulp.task('uglify',function(){
    gulp.src('index1.js')
        .pipe(uglify())
        .pipe(gulp.dest('uglify-js'))
});
gulp.task('concat',function(){
    gulp.src(['index1.js','index2.js'])
        .pipe(concat('concat.js'))
        .pipe(gulp.dest('concat-js'))
});
gulp.task('server',function(){
    gulp.src('./')
        .pipe(server({
            open:true,
            livereload:true,
            directoryListing:true
        }))
});
