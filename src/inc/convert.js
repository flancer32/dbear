'use strict'
/* libraries */
var Promise = require('promise')
/* own code */
var readFile = require('./util/readFile')
var writeFile = require('./util/writeFile')
var parseXml = require('./convert/parseXml')
var strJson = require('./convert/strJson')


/**
 * Main part of convert.
 * @constructor
 */
function Converter() {
}

/**
 *  opts:
 {
    demFileIn:    '(string): Path to the input file (XML/JSON).',
    demFileOut:   '(string): Path to th output file (JSON)',
    skipWriteOut: '(bool): should we skip the output file generation and return result JSON DEM as promise value.'
}
 * @param opts - running options.
 * @returns {promise}
 */
Converter.prototype.run = function _run(opts) {
    return new Promise(function (resolve, reject) {
        var fileIn = opts.opts
        var fileOut = opts.demFileOut
        var skipWriteOut = opts.skipWriteOut
        if (skipWriteOut) {
            if (fileIn !== undefined) {
                if ((fileIn.lastIndexOf(".xml") == fileIn.length - 4) && (fileIn.lastIndexOf("\\") !== fileIn.length - 5)) {
                    readFile(fileIn)
                        .then(parseXml)
                        .then(strJson)
                        .then(function (result) {
                            /* convert JSON string back to JSON object */
                            var json = JSON.parse(result)
                            resolve(json)
                        })
                } else {
                    reject(console.log("Error! Input file has incorrect name or extension!"))
                }
            } else {
                reject(console.log("Error! Required option 'in' is missing! Type dbear --help for details"))
            }
        } else {
            if ((fileIn && fileOut) !== undefined) {
                if ((fileIn.lastIndexOf(".xml") == fileIn.length - 4) && (fileIn.lastIndexOf("\\") !== fileIn.length - 5)) {
                    if ((fileOut.lastIndexOf(".json") == fileOut.length - 5) && (fileOut.lastIndexOf("\\") !== fileOut.length - 6)) {
                        readFile(fileIn)
                            .then(parseXml)
                            .then(strJson)
                            .then(function (result) {
                                /* other async flow (TODO should we have one more object to process this?) */
                                writeFile(fileOut, result).then(resolve)
                            })
                    } else {
                        reject(console.log("Error! Output file has incorrect name or extension!"))
                    }
                } else {
                    reject(console.log("Error! Input file has incorrect name or extension!"))
                }
            } else {
                reject(console.log("Error! Required options 'in, out' is missing! Type dbear --help for details"))
            }
        }
    })
}

module.exports = Converter
