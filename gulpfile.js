var gulp = require("gulp"),
    browserify = require("browserify"),
    source = require("vinyl-source-stream"),
    tslint = require("gulp-tslint"),
    tsc = require("gulp-typescript"),
    sourcemaps = require("gulp-sourcemaps"),
    uglify = require("gulp-uglify"),
    runSequence = require("run-sequence"),
    mergeStream = require("merge-stream"),
    mocha = require("gulp-mocha"),
    istanbul = require("gulp-istanbul")
    del = require('del');

gulp.task("lint", function () {
    return gulp.src([
        "src/**/**.ts",
    ])
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

gulp.task("build", function () {
    var tsProject = tsc.createProject("tsconfig.json");
    return gulp.src([
        "src/**/*.ts",
    ])
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("script/"));
});

gulp.task("transfer", function () {
    return gulp.src([
        "./src/*.html",
        "./src/data/**/*",
        "./src/**/*.js",
        ], {base: "src/"}).pipe(gulp.dest("dist"));
});

gulp.task("cleanup-dist", function () {
    return del(["dist/**/*"]);
});

gulp.task("publish", function (cb) {
    return runSequence("build", "cleanup-dist", "transfer", cb);
});
