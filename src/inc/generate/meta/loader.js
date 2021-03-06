'use strict'
/* libraries */
var Sequelize = require('sequelize')
var Promise = require('Promise')
/* own code */
var DbLoader = require('./loader/database')
var NamespaceLoader = require('./loader/namespace')
var EntityLoader = require('./loader/entity')
/**
 * Load META data and compose result dbDEM as promise value.
 * @param opts
 * @return {Loader}
 * @constructor
 */
function Loader(opts) {
    if (!(this instanceof  Loader)) return new Loader(opts)
    /**
     * META tables defined in Sequelize (namespace, entity, attribute, relation).
     */
    this.meta = opts.meta
    /**
     * Target DEM to be loaded from DB.
     */
    this.dbDEM = {dBEAR: {}}
    /**
     *  Cache to get META objects by ID while DEM is composed.
     */
    this.cache = {namespace: {}, entity: {}, relation: {}}
    /* todo: remove NEAR loaders if not required */
    /**
     * Namespace META data loader.
     */
    this.dbLoader = new DbLoader({
        table: this.meta.database,
        dbDEM: this.dbDEM
    })
    /**
     * Namespace META data loader.
     */
    this.nsLoader = new NamespaceLoader({
        table: this.meta.namespace,
        dbDEM: this.dbDEM,
        cache: this.cache
    })
    /**
     * Entity META data loader.
     */
    this.entityLoader = new EntityLoader({
        table: this.meta.entity,
        dbDEM: this.dbDEM,
        cache: this.cache
    })
}

Loader.prototype.load = function _load() {
    var iLoader = this
    return new Promise(function (resolve, reject) {
            /* load target dbDEM from META data */
            iLoader.dbLoader.load()
                .then(function () {
                    /* resolve promise with target dbDEM */
                    resolve(iLoader.dbDEM)
                }).catch(reject)
        }
    )
}

module.exports = Loader