var gulp = require('gulp'),
	minifyCSS = require('gulp-minify-css'),
	wrap = require('gulp-wrap');


gulp.task('css', function() {
	gulp.src('app/css/**/*.css')
	.pipe(minifyCSS('styles.css'))
	.pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
	gulp.src('app/js/**/*.js')
	.pipe(gulp.dest('dist/js'));
});

gulp.task('fonts', function() {
	gulp.src('app/fonts/**/*.*')
	.pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', function() {
	gulp.src('app/images/**/*')
	.pipe(gulp.dest('dist/images'));
});

gulp.task('layout', function() {
	gulp.src(['app/**/*.html', '!app/layout.html'])
	.pipe(wrap({src: 'app/layout.html'}))
	.pipe(gulp.dest('dist'));
});

gulp.task('default', function() {
	gulp.run('css', 'js', 'fonts', 'images', 'layout');
});

gulp.task('watch', function() {
	gulp.run('default');
	gulp.watch('app/js/**/*', function(event) {
		console.log('File ' + event.path + ' was ' + event.type);
		gulp.run('js');
	});
	gulp.watch('app/fonts/**/*', function(event) {
		console.log('File ' + event.path + ' was ' + event.type);
		gulp.run('fonts');
	});
	gulp.watch('app/images/**/*', function(event) {
		console.log('File ' + event.path + ' was ' + event.type);
		gulp.run('images');
	});
	gulp.watch('app/**/*.html', function(event) {
		console.log('File ' + event.path + ' was ' + event.type);
		gulp.run('layout');
	});
	gulp.watch('app/css/**/*.css', function(event) {
		console.log('File ' + event.path + ' was ' + event.type);
		gulp.run('css');
	});
});
