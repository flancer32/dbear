'use strict'
/* libraries */
var Promise = require('Promise')

/**
 * Load namespace meta data and save it to dbDEM structure.
 *
 * @param opts
 * @return {Namespace}
 * @constructor
 */
function Namespace(opts) {
    if (!(this instanceof  Namespace)) return new Namespace(opts)
    /* parse options */
    this.dbDEM = opts.dbDEM
    this.cache = opts.cache
    this.table = opts.table
    return
}

/**
 * Return promise that loads namespace related META data and initializes loader cache by namespace data.
 * @return {*|exports|module.exports}
 * @private
 */
Namespace.prototype.load = function _load() {
    var iNamespace = this
    var table = iNamespace.table
    var dbDEM = iNamespace.dbDEM
    var cache = iNamespace.cache
    return new Promise(function (resolve) {
            /* read META data */
            table.all({include: [{all: true}], raw: true}).then(
                function (rs) {
                    if (rs.length > 0) {
                        dbDEM.dBEAR.namespaces = {}
                        for (var i in rs) {
                            /* compose "namespace" entries in dbDEM */
                            var one = rs[0]
                            var ns = {
                                id:        one.name,
                                comment:   one.comment,
                                alias:     one.alias,
                                entities:  {},
                                relations: {}
                            }
                            dbDEM.dBEAR.namespaces[one.name] = ns
                            /* ... and save loaded namespace META data to cache */
                            cache.namespace[one.id] = one
                        }
                    }
                    resolve()
                }
            )
        }
    )
}

module.exports = Namespace