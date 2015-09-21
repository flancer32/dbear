'use strict'
/* libraries */
var Sequelize = require('sequelize')
var Promise = require('Promise')
/* own code */
var NamespaceLoader = require('./loader/namespace')
/**
 * Return dbDEM (loaded from META tables).
 * @param opts
 * @return {Loader}
 * @constructor
 */
function Loader(opts) {
    if (!(this instanceof  Loader)) return new Loader(opts)
    /* parse options */
    this.orm = opts.sequelize
    this.meta = opts.meta
    this.dbDEM = {dBEAR: {}}
    /* cache to get META objects by ID */
    this.cache = {namespace: {}, entity: {}, relation: {}}
    this.nsLoader = new NamespaceLoader({
        sequelize: this.orm,
        meta:      this.meta.namespace,
        dbDEM:     this.dbDEM,
        cache:     this.cache
    })
    return
}

Loader.prototype.load = function _load() {
    var iLoader = this
    return new Promise(function (resolve, reject) {
            /* read META data */
            var orm = iLoader.orm
            var meta = iLoader.meta
            iLoader.nsLoader.load().then(function () {
                resolve(iLoader.dbDEM)
                //meta.namespace
                //    .all({include: [{all: true}], raw: true})
                //    .then(function (rs) {
                //        for (var i in rs) {
                //            var one = rs[i]
                //            var name = one.name
                //            var alias = one.alias
                //            var comment = one.comment
                //            1 + 1
                //        }
                //    })
                //    .then(function () {
                //        meta.entity.all({include: [{all: true}], raw: true}).then(
                //            function (rs) {
                //
                //            }
                //        )
                //    })
            })

        }
    )
}

module.exports = Loader