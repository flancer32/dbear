'use strict'
var fs = require('fs')
var Promise = require('promise')

/**
 * Thenable function to write JSON structure to any text file.
 *
 * @param fileOut
 * @param result
 * @returns {Promise}
 */
function writeJSON(fileOut, result) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(fileOut, result, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

module.exports = writeJSON