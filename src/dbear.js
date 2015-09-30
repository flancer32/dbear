#!/usr/bin/env node
/**
 * dBEAR module's entry point.
 *
 */
'use strict'
var program = require('commander')
var path = require('path')
var Converter = require('./inc/convert')
var Generator = require('./inc/generate')
/**
 * Initialize program properties that can be replaced in tests.
 */
/**
 *
 * @type {*|Converter}
 */
program.converter = new Converter()
/**
 * Module's exports.
 */
module.exports = program

/**
 * Define main program runtime parameters (commands and options)
 */
program
    .version(require('../package.json').version)
    .option('-d, --db-dialect [value]', 'RDBMS dialect (mariadb|postgres|mysql), default: mariadb', /^(mariadb|postgres|mysql|sqlite|mssql)$/i, 'mariadb')
    .option('-H, --db-host [value]', 'Host to connect to, default: localhost', 'localhost')
    .option('-n, --db-name [value]', 'Database name to connect to, default: sample', 'sample')
    .option('-u, --db-user [value]', 'User name to create database connection, default: sample', 'sample')
    .option('-p, --db-password [value]', 'Password to create database connection, default: sample', 'sample')
    .option('-i, --in [value]', 'Input DEM file (XML or JSON)', absolutePath)
    .option('-o, --out [value]', 'Output DEM file (JSON)', absolutePath)

program
    .command('validate')
    .description('Validate incoming DEM (XML or JSON)')
    .action(function (command) {
        console.log('validate is here...')
    })

program
    .command('convert')
    .description('Convert DEM from one format to another (XML to JSON, for example) Usage: dbear --in [value] --out [value] convert')
    .action(function (command) {
        var opts = {}
        opts.opts = program.in
        opts.demFileOut = program.out
        program.converter.run(opts)
    })

program
    .command('generate')
    .description('Parse incoming DEM and create tables in DB')
    .action(function (command) {
        var opts = {}
        opts.dbDialect = program.dbDialect
        opts.dbHost = program.dbHost
        opts.dbName = program.dbName
        opts.dbUser = program.dbUser
        opts.dbPassword = program.dbPassword
        /* todo transform 'demFile' to absolute path */
        opts.demFile = program.in
        /**
         * @type {*|Generator}
         */
        program.generator = new Generator(opts)
        program.generator.run()
    })

program
    .command('analyze')
    .description('Analyze given DB and create outgoing DEM')
    .action(function () {
        console.log('analyze is here...')
    })


/**
 * Parse runtime parameters and start requested command.
 */
program.parse(process.argv)

/*
 Coercion functions (https://www.npmjs.com/package/commander#coercion).
 */

/**
 * Return absolute path to file related to working directory.
 *
 * @param val
 * @returns {Array}
 */
function absolutePath(val) {
    var currentDir = process.cwd()
    var result = path.join(currentDir, val)
    return result
}
