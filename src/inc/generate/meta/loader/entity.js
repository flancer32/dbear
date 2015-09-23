'use strict'
/* libraries */
var Promise = require('Promise')

/**
 * Load entity META data and save it to dbDEM structure.
 *
 * @param opts
 * @return {Entity}
 * @constructor
 */
function Entity(opts) {
    if (!(this instanceof  Entity)) return new Entity(opts)
    /* parse options */
    this.dbDEM = opts.dbDEM
    this.cache = opts.cache
    this.table = opts.table
}

/**
 * Return promise that loads namespace related META data and initializes loader cache by namespace data.
 * @return {*|exports|module.exports}
 * @private
 */
Entity.prototype.load = function _load() {
    var iEntity = this
    var table = iEntity.table
    var dbDEM = iEntity.dbDEM
    var cache = iEntity.cache
    return new Promise(function (resolve) {
            /* read META data */
            table.all({include: [{all: true}], raw: true}).then(
                function (rs) {
                    if (rs.length > 0) {
                        for (var i in rs) {
                            /* compose "entity" entries in dbDEM */
                            var one = rs[0]
                            var ns = cache.namespace[one.namespace_id]
                            var entity = {
                                id:         one.name,
                                comment:    one.comment,
                                alias:      one.alias,
                                attributes: {}
                            }
                            dbDEM.dBEAR.namespaces[ns.name].entities[one.name] = entity
                            /* ... and save loaded entry META data to cache */
                            cache.entity[one.id] = one
                        }
                    }
                    resolve()
                }
            )
        }
    )
}

module.exports = Entity