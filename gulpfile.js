var _ = require('lodash');
var babel = require('gulp-babel');
var cleanCSS = require('gulp-clean-css');
var ghPages = require('gulp-gh-pages');
var gulp = require('@momsfriendlydevco/gulpy');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var rimraf = require('rimraf');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

gulp.task('default', ['serve']);
gulp.task('build', ['js', 'css']);


/**
* Create a Nodemon monitored server and serve the demo project
*/
gulp.task('serve', ['build'], function() {
	var monitor = nodemon({
		script: './demo/server.js',
		ext: 'js css',
		ignore: ['**/*.js', '**/.css'], // Ignore everything else as its watched seperately
	})
		.on('start', function() {
			console.log('Server started');
		})
		.on('restart', function() {
			console.log('Server restarted');
		});

	watch(['./index.js', 'demo/**/*.js', 'src/**/*.js'], function() {
		console.log('Rebuild client-side JS files...');
		gulp.start('js');
	});

	watch(['demo/**/*.css', 'src/**/*.css'], function() {
		console.log('Rebuild client-side CSS files...');
		gulp.start('css');
	});
});


/**
* Compile all JS files (including minified varients)
*/
gulp.task('js', ()=>
	gulp.src('./src/angular-ui-history.js')
		.pipe(plumber({
			errorHandler: function(err) {
				gutil.log(gutil.colors.red('ERROR DURING JS BUILD'));
				process.stdout.write(err.stack);
				this.emit('end');
			},
		}))
		.pipe(rename('angular-ui-history.js'))
		.pipe(babel({
			presets: ['@babel/env'],
			plugins: ['angularjs-annotate'],
		}))
		.pipe(gulp.dest('./dist'))
		.pipe(uglify())
		.pipe(rename('angular-ui-history.min.js'))
		.pipe(gulp.dest('./dist'))
);

gulp.task('css', ()=>
	gulp.src('./src/angular-ui-history.css')
		.pipe(rename('angular-ui-history.css'))
		.pipe(gulp.dest('./dist'))
		.pipe(rename('angular-ui-history.min.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('./dist'))
);

gulp.task('gh-pages', ['build'], function() {
	rimraf.sync('./gh-pages');

	return gulp.src([
		'./LICENSE',
		'./demo/_config.yml',
		'./demo/app.js',
		'./demo/index.html',
		'./demo/history.json',
		'./demo/style.css',
		'./dist/**/*',
		'./node_modules/angular/angular.min.js',
		'./node_modules/angular-gravatar/build/angular-gravatar.min.js',
		'./node_modules/moment/min/moment.min.js',
		'./node_modules/@momsfriendlydevco/angular-bs-tooltip/dist/angular-bs-tooltip.min.js',
		'./node_modules/bootstrap/dist/css/bootstrap.min.css',
		'./node_modules/bootstrap/dist/js/bootstrap.min.js',
		'./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
		'./node_modules/jquery/dist/jquery.min.js',
		'./node_modules/font-awesome/css/font-awesome.min.css',
		'./node_modules/font-awesome/fonts/fontawesome-webfont.ttf',
		'./node_modules/font-awesome/fonts/fontawesome-webfont.woff',
		'./node_modules/font-awesome/fonts/fontawesome-webfont.woff2',
		'./node_modules/quill/dist/quill.min.js',
		'./node_modules/ng-quill/dist/ng-quill.min.js',
		'./node_modules/quill/dist/quill.snow.css',
	], {base: __dirname})
		.pipe(rename(function(path) {
			if (path.dirname == 'demo') { // Move all demo files into root
				path.dirname = '.';
			}
			return path;
		}))
		.pipe(ghPages({
			cacheDir: 'gh-pages',
			push: true, // Change to false for dryrun (files dumped to cacheDir)
		}))
});
