const gulp = require("gulp");
const uglify = require('gulp-uglify-es').default;
const webpack = require("webpack-stream");
const rename = require("gulp-rename");
const zip = require("gulp-zip");

gulp.task("default", ["build-js"]);

gulp.task("build-js", function() {
    gulp.src("src/lazy-img.js")
        .pipe(webpack())
        .pipe(uglify())
        .pipe(rename("lazy-img.min.js"))
        .pipe(gulp.dest("dist/"));
});

gulp.task("build-release", ["build-js"], function() {
    const packageData = require("./package.json");
    const version = packageData.version;

    gulp.src("dist/*")
        .pipe(zip("lazy-img_v" + version + ".zip"))
        .pipe(gulp.dest("releases/"));
});