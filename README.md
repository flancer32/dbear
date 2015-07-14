# dBEAR

Common basics for Entity-Attribute-Relation databases.

## Install

    $ npm install
    $ npm i -g mocha
    
## Create DB
    
    Create DB 'sample_sequelize' on localhost, create user 'sample' with password '3Jcftix7VycNkEYKxIDW'. 
    Grant all permissions for user 'sample' on DB 'sample_sequelize'.


## Development tasks
[Gulp](https://github.com/gulpjs/gulp)

    $ gulp
    ...
    Use the following commands with gulp:
        clean:      clean up build results;
        todo:       generate to-do list in ./build/TODO.md;
        plato:      generate source analysis report in ./build/plato/;
        test:       run tests (./src/**/*.spec.js) and display report in console;
        test-rep:   run tests (./src/**/*.spec.js) and save report to './build/TEST.md' (failed if launched first, start 'gulp todo' before);
        cover:      run test coverage and save report to './build/coverage/lcov-report/index.html';
    ...