'use strict'
/* libraries */
var Sequelize = require('sequelize')
var Promise = require('Promise')
/* own code */
var DbLoader = require('./loader/database')

/**
 * Load META data and compose result dbDEM as promise value.
 * @return {Loader}
 * @constructor
 */
function Loader() {
    if (!(this instanceof  Loader)) return new Loader()
    /**
     * META tables defined in Sequelize (namespace, entity, attribute, relation).
     */
    this.meta = {}
    /**
     * Target DEM to be loaded from DB.
     */
    this.dbDEM = {dBEAR: {}}
    /**
     *  Cache to get META objects by ID while DEM is composed.
     */
    this.cache = {namespace: {}, entity: {}, relation: {}}
    /**
     * Namespace META data loader.
     */
    this.dbLoader = {}
}

/**
 * $opts = {
 *  meta: {}
 * }
 * @param $opts
 * @private
 */
Loader.prototype.init = function _init($opts) {
    /**
     * META tables defined in Sequelize (namespace, entity, attribute, relation).
     */
    this.meta = $opts.meta
    /**
     * Target DEM to be loaded from DB.
     */
    this.dbDEM = {dBEAR: {}}
    /**
     *  Cache to get META objects by ID while DEM is composed.
     */
    this.cache = {namespace: {}, entity: {}, relation: {}}
    /**
     * Namespace META data loader.
     */
    this.dbLoader = new DbLoader({
        table: this.meta.database,
        dbDEM: this.dbDEM
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