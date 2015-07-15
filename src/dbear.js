#!/usr/bin/env node
/**
 * dBEAR module's entry point.
 *
 */
var program = require('commander')

module.exports = program

program
    .version(require('../package.json').version)
    .option('-g, --generate', 'Parse incoming DEM and create tables in DB')

program
    .command('validate')
    .description('Validate incoming DEM (XML or JSON)')
    .action(function () {
        console.log('validate is here...');
    })

program
    .command('convert')
    .description('Convert DEM from one format to another (XML to JSON, for example)')
    .action(function () {
        console.log('convert is here...');
    })

program
    .command('generate')
    .description('Parse incoming DEM and create tables in DB')
    .action(function () {
        console.log('generate is here...');
    })

program
    .command('analyze')
    .description('Analize given DB and create outgoing DEM')
    .action(function () {
        console.log('analyze is here...');
    })


program.parse(process.argv)

