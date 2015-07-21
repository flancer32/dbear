#!/usr/bin/env node
/**
 * dBEAR module's entry point.
 *
 */
var program = require('commander')
var paramsConverter = require('./inc/convert/params')
var paramsGenerator = require('./inc/generate/params')
var Converter = require('./inc/convert')
var Generator = require('./inc/generate')
/**
 * Initialize program properties that can be replaced in tests.
 */
program.params = {}
program.params.convert = paramsConverter
program.params.generate = paramsGenerator
/**
 *
 * @type {*|Converter}
 */
program.converter = new Converter
/**
 * @type {*|Generator}
 */
program.generator = new Generator
/**
 * Module's exports.
 */
module.exports = program

/**
 * Define main program runtime parameters (commands and options)
 */
program
    .version(require('../package.json').version)
    .option('-d, --db-dialect [value]', 'RDBMS dialect (mariadb|postgres|mysql), default: mariadb', /^(mariadb|postgres|mysql)$/i, 'mariadb')
    .option('-H, --db-host [value]', 'Host to connect to, default: localhost', 'localhost')
    .option('-n, --db-name [value]', 'Database name to connect to, default: sample', 'sample')
    .option('-u, --db-user [value]', 'User name to create database connection, default: sample', 'sample')
    .option('-p, --db-password [value]', 'Password to create database connection, default: sample', 'sample')
    .option('-i, --in [value]', 'Input DEM file (XML or JSON)')
    .option('-o, --out [value]', 'Output DEM file (JSON)')

program
    .command('validate')
    .description('Validate incoming DEM (XML or JSON)')
    .action(function (command) {
        console.log('validate is here...')
    })

program
    .command('convert')
    .description('Convert DEM from one format to another (XML to JSON, for example)')
    .action(function (command) {
        /* TODO Uncomment this.
        * #Created on 21-Jul-15
        * This blocked gult cover
        * */
        var params = program.params.convert
        params.demFileIn = program.in
        params.demFileOut = program.out
        program.converter.run(params)
    })

program
    .command('generate')
    .description('Parse incoming DEM and create tables in DB')
    .action(function (command) {
        var params = program.params.generate
        params.dbDialect = program.dbDialect
        params.dbHost = program.dbHost
        params.dbName = program.dbName
        params.dbUser = program.dbUser
        params.dbPassword = program.dbPassword
        params.demFile = program.in
        program.generator.createDBEAR(params)
    })

program
    .command('analyze')
    .description('Analize given DB and create outgoing DEM')
    .action(function () {
        console.log('analyze is here...')
    })


/**
 * Parse runtime parameters and start requested command.
 */
program.parse(process.argv)

