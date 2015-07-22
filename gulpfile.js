/* Gulp configuration file (https://github.com/gulpjs/gulp/tree/master/docs) */
var gulp = require('gulp')
/* clean up temporary and target files */
var del = require('del')
/* Useful when you need to use the file paths from a gulp pipeline in vanilla node module. */
var vinylPaths = require('vinyl-paths')
/* Generate an *.md file from your javascript todos and fixmes */
var todo = require('gulp-todo')
/* Run Mocha tests */
var mocha = require('gulp-mocha')
/* Generate complexity analysis reports with plato (https://github.com/es-analysis/plato) */
var plato = require('plato')
/* Server side testing and code coverage */
var istanbul = require('gulp-istanbul');
/* Filesystem operations */
var fs = require('fs')

gulp.task('default', function () {
    var msg = "\n\
Use the following commands with gulp:\n\
    clean:      clean up build results;\n\
    todo:       generate to-do list in ./build/TODO.md;\n\
    plato:      generate source analysis report in ./build/plato/;\n\
    test:       run tests (./src/**/*.spec.js) and display report in console;\n\
    test-rep:   run tests (./src/**/*.spec.js) and save report to './build/TEST.md' (failed if launched first, start 'gulp todo' before);\n\
\n"
    console.log(msg)
})

/**
 * Clean up all not source directories.
 */
gulp.task('clean', function () {
    gulp.src(['build/'], {read: false}).pipe(vinylPaths(del))
})

/**
 * Generate "to-do" list in the "./build/" folder.
 */
gulp.task('todo', function () {
    gulp.src('src/**/*.js').pipe(todo({fileName: 'build/TODO.md'})).pipe(gulp.dest('./'))
})

/**
 * "JavaScript Source Analysis" report.
 */
gulp.task('plato', function () {
    var files = ['src/**/*.js']
    var outputDir = 'build/plato'
    /* http://jshint.com/docs/options/ */
    var opts = {
        jshint: {
            options: {
                strict: true,
                node:   true,
                mocha:  true,
                asi:    true
            }
        }
    }
    /* callback function */
    var done = function (report) {}
    plato.inspect(files, outputDir, opts, done)
})

/**
 *  Run test and save Markdown report to file.
 */
gulp.task('test-rep', function () {
    var output = './build/TESTS.md'
    // clear out old coverage file (TODO: failed if 'gulp test' is started first)
    fs.writeFileSync(output, '')
    // if you still want to see output in the console
    //   you need a copy of the original write function
    var ogWrite = process.stdout.write;
    process.stdout.write = function (chunk) {
        fs.appendFile(output, chunk);
        // this will write the output to the console
        //ogWrite.apply(this, arguments);
    }

    return gulp.src('src/**/*.spec.js', {read: false}).pipe(mocha({reporter: 'markdown'}))
})

/**
 *  Run test and display report in console.
 */
gulp.task('test', function () {
    return gulp.src('src/**/*.spec.js', {read: false}).pipe(mocha({reporter: 'spec'}))
})

/**
 * Generate code coverage report for JavaScript code.
 */
gulp.task('cover', function (cb) {
    //@formatter:off
  gulp.src(['src/**/!(*.spec).js'])
    .pipe(istanbul()) // Covering files
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function () {
      gulp.src(['src/**/*.spec.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports(
                {
                    dir: './build/coverage',
                    reportOpts: { dir: './build/coverage' }
                }
        )) // Creating the reports after tests ran
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } })) // Enforce a coverage of at least 90%
        .on('end', cb);
    });
    //@formatter:on
});