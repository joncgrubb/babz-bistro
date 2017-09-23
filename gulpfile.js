var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	minifyCSS = require('gulp-minify-css'),
	headerfooter = require('gulp-headerfooter'),
	sass = require('gulp-sass');


gulp.task('sass', function() {
	gulp.src([
		'node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss', 
		'app/scss/**/*.scss'])
	.pipe(sass())
	.pipe(gulp.dest('app/css'));
});

gulp.task('css', function() {
	gulp.src('app/css/**/*.css')
	.pipe(minifyCSS())
	.pipe(concat('styles.css'))
	.pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
	gulp.src([
		'node_modules/jquery/dist/jquery.js', 
		'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js', 
		'app/js/**/*.js'])
	.pipe(uglify())
	.pipe(concat('script.js'))
	.pipe(gulp.dest('dist/js'));
});

gulp.task('images', function() {
	gulp.src('app/images/**/*')
	.pipe(gulp.dest('dist/images'));
});

gulp.task('html', function() {
	gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));
});

gulp.task('go', function() {
	gulp.run('sass', 'css', 'js', 'images');
});

gulp.task('headerfooter', function() {
	gulp.src('app')
	.pipe(headerfooter.header('app/partials/header.html'))
	.pipe(headerfooter.footer('/app/partials/footer.html'))
	.pipe(gulp.dest('app'))
})

gulp.task('watch', function() {
	gulp.run('go');
	gulp.watch('app/scss/**/*.scss', function(event) {
		console.log('File ' + event.path + 'was' + event.type + ', doing work son.');
		gulp.run('sass');
	});
	gulp.watch('app/js/**/*.js', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', doing work son.');
		gulp.run('js');
	});
	gulp.watch('app/images/**/*', function(event) {
		console.log('File ' + event.path ' was ' + event.type + ', doing work son.');
		gulp.run('images');
	});
	gulp.watch('app/*.html', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', doing work son.');
		gulp.run('html');
	});
	gulp.watch('app/partials/*.html', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', doing work son.');
		gulp.run('headerfooter');
	});
});
