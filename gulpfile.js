
const { series } = require("gulp");
const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

function transformacaoTS() {
    return tsProject.src().pipe(tsProject()).pipe(gulp.dest('build'));
}

function config() {
    return gulp.src('src/setting/*.json').pipe(gulp.dest('./build/setting/'));
}

exports.default = series(transformacaoTS, config);