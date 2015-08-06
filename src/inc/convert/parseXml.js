'use strict'
/* libraries */
var Promise = require('promise')
var parseString = require('xml2js').parseString
/* own code */
var tagStrip = require('./../util/tagStrip')
var analyzeRoot = require('./parseXml/root')
var analyze = new analyzeRoot()

function parseXml(data) {

    return new Promise(function (resolve, reject) {
        parseString(data, {
            tagNameProcessors: [tagStrip], // strip tag prefix
            explicitArray:     false, // remove arrays in child nodes
            mergeAttrs:        true, // attributes become child nodes
            emptyTag:          {}
        }, function (err, result) {
            var resultJSON = analyze.parse(result)
            if (err) {
                reject(err)
            } else {
                resolve(resultJSON)
            }
        })
    })
}

module.exports = parseXml