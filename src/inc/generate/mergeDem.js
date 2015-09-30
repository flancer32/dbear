'use strict'
/* libraries */
var Promise = require('promise')
/* own code */


/**
 * Merge 2 DEMs into one result DEM and update META data containers.
 *
 * @constructor
 */
function MergeDem(opts) {
    if (!(this instanceof  MergeDem)) return new MergeDem()
    this.opts = opts || {}
}

/**
 * opts = {
 *  dbDem: {},
 *  loadedDem: {}
 * }
 * @param opts
 * @return {promise}
 * @private
 */
MergeDem.prototype.merge = function _merge(opts) {
    var iMerger = this
    var resultDem = opts.dbDem
    var loadedDem = opts.loadedDem
    /* ... return promise function that performs requested operations */
    return new Promise(function (resolve, reject) {
        var result = {}
        var namespaces = loadedDem.dBEAR.namespaces
        for (var key in namespaces) {
            var ns = namespaces[key]
        }

        result.dem = resultDem
        resolve(result)
    })
}

module.exports = MergeDem