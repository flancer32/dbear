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
 *
 * @param params
 * @returns {promise}
 * @private
 */
Converter.prototype.run = function _run(params) {
    return new Promise(function (resolve, reject) {

        if (params.skipWriteOut) {
            if (params.demFileIn !== undefined) {
                if ((params.demFileIn.lastIndexOf(".xml") == params.demFileIn.length-4) && (params.demFileIn.lastIndexOf("\\") !== params.demFileIn.length-5)) {
                    var fileIn = params.demFileIn
                    var fileOut = params.demFileOut
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
            if ((params.demFileIn && params.demFileOut) !== undefined) {
                if ((params.demFileIn.lastIndexOf(".xml") == params.demFileIn.length-4) && (params.demFileIn.lastIndexOf("\\") !== params.demFileIn.length-5)) {
                    if ((params.demFileOut.lastIndexOf(".json") == params.demFileOut.length-5) && (params.demFileOut.lastIndexOf("\\") !== params.demFileOut.length-6)) {
                        var fileIn = params.demFileIn
                        var fileOut = params.demFileOut
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
