'use strict'
/* libraries */
var Promise = require('promise')
/* own code */
var readFile = require('../util/readFile')
var Converter = require('../convert')

/**
 * Load DEM from XML file and convert to JSON or just load data from JSON file.
 * @constructor
 */
function DemLoader() {
    this.demFileIn = undefined
    this.readFile = readFile
    this.converter = new Converter()
}

/**
 *
 * @param demFileIn
 * @return {*|exports|module.exports}
 * @private
 */
DemLoader.prototype.load = function _load(demFileIn) {
    var iLoader = this
    iLoader.demFileIn = demFileIn
    /* ... return promise function that performs requested operations */
    return new Promise(function (resolve, reject) {
        iLoader
            .readFile(iLoader.demFileIn)
            .then(function (buffer) {
                var result
                var start = buffer.toString('utf8', 0, 5);
                if (start == '<?xml') {
                    /* try to load XML DEM and convert it to JSON */
                    var opts = {demFileIn: demFileIn, skipWriteOut: true}
                    iLoader.converter.run(opts).then(resolve).catch(reject)
                } else {
                    /* process as JSON */
                    var str = buffer.toString()
                    result = JSON.parse(str)
                    resolve(result)
                }
            })
            .catch(reject)
    })
}

module.exports = DemLoader