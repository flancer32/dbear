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
 *  newDem: {}
 * }
 * @param opts
 * @return {promise}
 * @private
 */
MergeDem.prototype.merge = function _merge(opts) {
    var iMerger = this
    var resultDem = opts.dbDem
    var newDem = opts.newDem
    /* ... return promise function that performs requested operations */
    return new Promise(function (resolve, reject) {
        var result = {}
        var namespaces = newDem.dBEAR.namespaces
        for (var key in namespaces) {
            var ns = namespaces[key]
            if (!resultDem.key) {
                resultDem.key = {}
            } else {

            }
        }

        result.dem = resultDem
        resolve(result)
    })
}

MergeDem.prototype.mergeNamespaces = function _mergeNamespaces(opts) {

}

module.exports = MergeDem