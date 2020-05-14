
const gulp = require('gulp');
const rimraf = require('gulp-rimraf');
const tslint = require('gulp-tslint');
const mocha = require('gulp-mocha');
const shell = require('gulp-shell');
const env = require('gulp-env');

/**
 * Remove build directory.
 */
gulp.task('clean', function () {
    return gulp.src("build", { read: false })
        .pipe(rimraf());
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
    return gulp.src('src/**/*.ts')
        .pipe(tslint( {
            formatter: 'prose'
        }))
        .pipe(tslint.report());
});

/**
 * Compile TypeScript.
 */
function compileTS(args, cb) {
    return exec(tscCmd + args, (err, stdout, stderr) => {
        console.log(stdout);

        if (stderr) {
            console.log(stderr);
        }
        cb(err);
    });
}

gulp.task('compile', shell.task([
    'npm run tsc',
]));

/**
 * Watch for changes in TypeScript
 */
gulp.task('watch', shell.task([
    'npm run tsc-watch',
]));

/**
 * Copy setting files
 */
gulp.task('configs', (cb) => {
    return gulp.src("src/setting/*.json").pipe(gulp.dest('./build/setting/'));
});

gulp.task('env', (cb) => {
    return gulp.src(".env").pipe(gulp.dest('./build/'));
});

/**
 * Build the project.
 */
gulp.task('build', ['tslint', 'compile', 'configs', 'env'], () => {
    console.log('Building the project ...');
});
