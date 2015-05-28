var gulp = require('gulp');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var browserify = require('browserify');
var mainBowerFiles = require('main-bower-files');

var watchify = require('watchify');

gulp.task('default', ['watch']);

gulp.task('watch', function() {
	// Configure a browserify instance.
	// Note that Babel handles JSX natively.
	var watcher = watchify(browserify({
		entries: './ux/app.jsx',
		transform: [babelify],
		debug: true,
		cache: {},
		packageCache: {},
		fullPaths: true
	}));

	// Set up the watcher to build on update.
	// Also build once on invocation.
	return watcher
		.on('update', function() {
			watcher
				.bundle()
				.pipe(source('app.js'))
				.pipe(gulp.dest('./wwwroot/build/'))

			console.log('Updated');
		})
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest('./wwwroot/build/'));
});

gulp.task("bower-files", function() {
	gulp
		.src(mainBowerFiles())
		.pipe(gulp.dest("./wwwroot/build/"));
});