import Gulp from 'gulp'
import babel from 'gulp-babel'


const task = ::Gulp.task
	,src = ::Gulp.src
	,dest = ::Gulp.dest
	,watch = ::Gulp.watch


task('build', () => src('src/**/*')
	.pipe(babel())
	.pipe(dest('lib')))

task('default', () => console.log('Hola'))
