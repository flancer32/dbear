'use strict'
/* libraries */
var Sequelize = require('sequelize')
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
    this.orm = opts.sequelize
    this.dbDEM = opts.dbDEM
    this.cache = opts.cache
    this.meta = opts.meta
    return
}

Namespace.prototype.load = function _load() {
    var iNamespace = this
    var meta = iNamespace.meta
    var dbDEM = iNamespace.dbDEM
    var cache = iNamespace.cache
    return new Promise(function (resolve, reject) {
            /* read META data */
            meta.all({include: [{all: true}], raw: true}).then(
                function (rs) {
                    if (rs.length > 0) {
                        if (!(dbDEM.dBEAR.namespaces instanceof  Array)) {
                            dbDEM.dBEAR.namespaces = []
                        }
                        for (var i in rs) {
                            var one = rs[0]
                            var ns = {
                                id:       one.name,
                                comment:  one.comment,
                                entities: []
                            }
                            dbDEM.dBEAR.namespaces.push(ns)
                            cache[one.id] = one
                        }
                    }
                    resolve()
                }
            )
        }
    )
}

module.exports = Namespace