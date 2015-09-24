'use strict'
/* libraries */
var Promise = require('Promise')

/**
 * Load current dbDEM from _database META table.
 *
 * @param opts
 * @return {Attribute}
 * @constructor
 */
function Database(opts) {
    if (!(this instanceof  Database)) return new Database(opts)
    /* parse options */
    this.dbDEM = opts.dbDEM
    this.cache = opts.cache
    this.table = opts.table
}

/**
 * Return promise that loads dbDEM from database META table.
 * @return {*|exports|module.exports}
 * @private
 */
Database.prototype.load = function _load() {
    var iDb = this
    var db = iDb.table
    var dbDEM = iDb.dbDEM
    return new Promise(function (resolve) {
            /* read META data */
            db.all({raw: true}).then(
                function (rs) {
                    if (rs.length > 0) {
                        for (var i in rs) {
                            /* read dbDEM */
                            var one = rs[0]
                            /* todo: read DEM from DB and convert to JSON */
                        }
                    }
                    resolve(dbDEM)
                }
            )
        }
    )
}

module.exports = Database