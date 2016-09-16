import Gulp from 'gulp'
import babel from 'gulp-babel'
import eslint from 'gulp-eslint'
import mocha from 'gulp-mocha'
import gutil from 'gulp-util'


const task = ::Gulp.task
	,src = ::Gulp.src
	,dest = ::Gulp.dest
	,watch = ::Gulp.watch

let errorLogger = ['error', function (err) {
	gutil.log(err.stack)
	this.emit('end')
}]


task('lint', () => src(['src/**/*.js','!node_modules/**'])
	.pipe(eslint())
	.on(...errorLogger)
	.pipe(eslint.formatEach('compact', process.stderr)))

task('build', ['lint'], () => src(['src/**/*.js'])
	.pipe(babel())
	.on(...errorLogger)
	.pipe(dest('lib')))

task('watch', ['build'], () => {
	watch(['src/**/*.js'], ['build'])
})

task('test', ['build'], () => src(['test/**/*.js'])
	.pipe(mocha())
	.on(...errorLogger))

task('testing', ['test'], () => {
	watch(['src/**/*.js', 'test/**/*.js'], ['test'])
})

task('default', ['build'])
