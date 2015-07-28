'use strict'
var fs = require('fs')
var Promise = require('promise')

/**
 * Thenable function to read any text file.
 *
 * @param filename
 * @param options
 * @returns {Promise}
 */
function readFile(filename, options) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filename, options, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

module.exports = readFile