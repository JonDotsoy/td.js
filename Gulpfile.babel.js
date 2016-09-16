import Gulp from 'gulp'
import babel from 'gulp-babel'


const task = ::Gulp.task
	,src = ::Gulp.src
	,dest = ::Gulp.dest
	,watch = ::Gulp.watch


task('build', () => src(['src/**/*.js'])
	.pipe(babel())
	.pipe(dest('lib')))

task('watch', () => {
	watch(['src/**/*.js'], ['build'])
})

task('default', () => console.log('Hola'))
