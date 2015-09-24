'use strict'
/* libraries */
var Promise = require('Promise')

/**
 * Load attribute META data and save it to dbDEM structure.
 *
 * @param opts
 * @return {Attribute}
 * @constructor
 */
function Attribute(opts) {
    if (!(this instanceof  Attribute)) return new Attribute(opts)
    /* parse options */
    this.dbDEM = opts.dbDEM
    this.cache = opts.cache
    this.table = opts.table
}

/**
 * Return promise that loads attribute related META data and initializes loader cache by attribute data.
 * @return {*|exports|module.exports}
 * @private
 */
Attribute.prototype.load = function _load() {
    var iAttribute = this
    var table = iAttribute.table
    var dbDEM = iAttribute.dbDEM
    var cache = iAttribute.cache
    return new Promise(function (resolve) {
            /* read META data */
            table.all({include: [{all: true}], raw: true}).then(
                function (rs) {
                    if (rs.length > 0) {
                        for (var i in rs) {
                            /* compose "attribute" entries in dbDEM */
                            var one = rs[0]
                            var ns = cache.namespace[one.namespace_id]
                            var attr = {
                                id:         one.name,
                                comment:    one.comment,
                                alias:      one.alias,
                                attributes: {}
                            }
                            dbDEM.dBEAR.namespaces[ns.name].entities[one.name] = attr
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

module.exports = Attribute