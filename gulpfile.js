const gulp       = require('gulp');
const del        = require('del');
const prefix     = require('gulp-autoprefixer');
const lint       = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');
const sass       = require('gulp-sass');
const sync       = require('browser-sync');

const reload     = sync.reload;

gulp.task('clean', del.bind(null, ['public/style.css'], {read: false}));

gulp.task('default', ['server', 'watch']);

gulp.task('lint', () => {
  return gulp.src(['*/**/*.js', '!node_modules/*', '!public/'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('styles', () => {
  return gulp.src('src/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix('last 2 versions'))
    .pipe(gulp.dest('public'));
});

gulp.task('server', () => {
  sync.init({
    notify: false,
    server: {
      baseDir: './public'
    }
  });
});

gulp.task('watch', () => {
  gulp.watch('src/style.scss', ['styles', reload])
  gulp.watch('public/*.html', reload);
});
