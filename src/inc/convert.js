'use strict'
/* libraries */
var Promise = require('promise')
/* own code */
var readFile = require('./util/readFile')
var writeFile = require('./util/writeFile')
var parseXml = require('./convert/parseXml')
var strJSON = require('./convert/strJSON')


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
        var fileIn = params.demFileIn
        var fileOut = params.demFileOut

        readFile(fileIn)
            .then(parseXml)
            .then(strJSON)
            .then(function (result) {
                if (!params.skipWriteOut) {
                    /* other async flow (TODO should we have one more object to process this?) */
                    writeFile(fileOut, result).then(resolve)
                } else {
                    /* convert JSON string back to JSON object */
                    var json = JSON.parse(result)
                    resolve(json)
                }
            })
    })
}

module.exports = Converter
