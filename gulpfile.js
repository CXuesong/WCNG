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
    del = require('del'),
    jsonminify = require('gulp-jsonminify'),
    include = require("gulp-include");

var SRC_PATH = "./src";
var DIST_PATH = "./dist";

gulp.task("lint", function () {
    return gulp.src([
        SRC_PATH + "/**/**.ts",
    ])
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

////////// BUILD //////////
gulp.task("build-ts", function () {
    var tsProject = tsc.createProject("tsconfig.json");
    return gulp.src([
        SRC_PATH + "/**/*.ts",
    ], {base: "./"})
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("./"));
});

gulp.task("build", function (cb) {
    return runSequence(["build-ts"], cb);
});

////////// PUBLISH //////////
gulp.task("transfer-misc", function () {
    return gulp.src([
        SRC_PATH + "/*.html",
        SRC_PATH + "/data/**/*",
        SRC_PATH + "/**/*.js",
        ], {base: SRC_PATH + "/"})
        .pipe(include())
        .pipe(gulp.dest(DIST_PATH));
});

gulp.task("transfer-minify-json", function () {
    return gulp.src([DIST_PATH + "/**/*.json"], {base: "./"})
        .pipe(jsonminify())
        .pipe(gulp.dest("./"));
});

gulp.task("transfer", function (cb) {
    return runSequence("transfer-misc", "transfer-minify-json", cb);
});

gulp.task("cleanup-dist", function () {
    return del([DIST_PATH + "/*.html"], [DIST_PATH + "/**/*.js"]);
});

gulp.task("publish", function (cb) {
    return runSequence("build", "cleanup-dist", "transfer", cb);
});
