// Init modules
const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync");
const cssnano = require("cssnano");
const gulp = require("gulp");
const clean = require("gulp-clean");
const replace = require("gulp-replace");
const concat = require("gulp-concat");
const postcss = require("gulp-postcss");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");
const imagemin = require("gulp-imagemin");

// File path variables
const files = {
    scssPath: "src/scss/**/*.scss",
    jsPath: "src/js/**/*.js",
    imgPath: "src/img/**/*",
    distPath: "./dist/*",
};

// Clear dist folder before building
function clear() {
    return gulp
        .src(files.distPath, {
            read: false,
        })
        .pipe(clean());
}

exports.clear = clear;

// Sass task

function buildStyles() {
    let plugins = [autoprefixer({ browsers: ["last 1 version"] }), cssnano()];
    return gulp.src(files.scssPath).pipe(sourcemaps.init()).pipe(sass().on("error", sass.logError)).pipe(postcss(plugins)).pipe(rename("styles.min.css")).pipe(sourcemaps.write(".")).pipe(gulp.dest("dist"));
}

exports.buildStyles = buildStyles;

// JS task

function buildScripts() {
    return gulp.src(files.jsPath).pipe(sourcemaps.init()).pipe(concat("scripts.min.js")).pipe(uglify()).pipe(sourcemaps.write(".")).pipe(gulp.dest("dist"));
}

exports.buildScripts = buildScripts;

// Img task

function buildImgs() {
    return gulp.src(files.imgPath).pipe(imagemin()).pipe(gulp.dest("dist/img"));
}

exports.buildImgs = buildImgs;

// Watch task

function watchStyles() {
    gulp.watch(files.scssPath, buildStyles).on("change", browserSync.reload);
}

exports.watchStyles = watchStyles;

function watchScripts() {
    gulp.watch(files.jsPath, buildScripts).on("change", browserSync.reload);
}

exports.watchScripts = watchScripts;

function watchImgs() {
    gulp.watch(files.imgPath, buildImgs).on("change", browserSync.reload);
}

exports.watchImgs = watchImgs;
5;
// function watchTask() {
//   gulp.watch([files.scssPath, files.jsPath, files.imgPath], gulp.parallel(scssTask))
// }

function serve(cb) {
    browserSync.init({
        server: {
            baseDir: "./",
        },
    });
    cb();
}

exports.serve = serve;

//Dev task

exports.dev = gulp.parallel(watchStyles, watchScripts, watchImgs, serve);

// Default task

exports.build = gulp.series(clear, gulp.parallel(buildStyles, buildScripts, buildImgs));