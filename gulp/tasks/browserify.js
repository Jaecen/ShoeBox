var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function() {
	return browserify({
			entries: ['./src/app.js'],
			extensions: ['.jsx']
		})
		.bundle()
		//Pass desired output filename to vinyl-source-stream
		.pipe(source('app.bundled.js'))
		// Start piping stream to tasks!
		.pipe(gulp.dest('./src/'));
});
