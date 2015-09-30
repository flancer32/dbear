'use strict'
/* libraries */
var Sequelize = require('sequelize')
var Promise = require('Promise')
/* own code */
var Converter = require('./convert')
var MetaTables = require('./generate/meta/tables')
var MetaLoader = require('./generate/meta/loader')
var DemLoader = require('./generate/loadDem')
/**
 * opts = {
 *  dbHost:     '',
 *  dbDialect:  '',
 *  dbName:     '',
 *  dbUser:     '',
 *  dbPassword: '',
 *  demFile:    '',
 * }
 * @param opts
 * @return {Generator}
 * @constructor
 */
function Generator(opts) {
    if (!(this instanceof  Generator)) return new Generator(opts)

    this.opts = opts || {}
    this.converter = new Converter()
    this.demLoader = new DemLoader()
    this.sequelize = {}
    _initOrm(this)
    return

    /**
     * Constructor's function to initialize Sequelize object (ORM).
     *
     * @param iGenerator
     * @private
     */
    function _initOrm(iGenerator) {
        //var iGenerator = this
        var ownOpts = iGenerator.opts
        var ormOpts = {
            host:    ownOpts.dbHost,
            dialect: ownOpts.dbDialect,
            define:  {
                timestamps:      false, /* don't add the timestamp attributes (updatedAt, createdAt) */
                freezeTableName: true /* disable the modification of tablenames into plural */
            }
        }
        iGenerator.sequelize = new Sequelize(ownOpts.dbName, ownOpts.dbUser, ownOpts.dbPassword, ormOpts)
    }

}

/**
 * Perform all actions to generate addition domain structure defined in the new DEM.
 */
Generator.prototype.run = function _run() {
    /* create shortcut for Generator itself */
    var iGenerator = this
    return new Promise(function (resolve, reject) {
        /* read META data from DB (dbDEM) and input data from file (newDEM) ... */
        Promise.all([
            iGenerator.readMeta(),
            iGenerator.loadDem()
        ])
            .then(iGenerator.mergeDems.bind(iGenerator))
            .then(iGenerator.updateDb.bind(iGenerator))
            .then(function (res) {
                resolve(res)
            })
            .catch(function (err) {
                reject(err)
            })
    })
}

/**
 * Read META data from DB or create new META tables for empty DB.
 */
Generator.prototype.readMeta = function _readMeta() {
    var iGenerator = this
    return new Promise(function (resolve, reject) {
        /* read META data */
        var sequelize = iGenerator.sequelize;
        /* todo: not testable code */
        var meta = new MetaTables({sequelize: sequelize})
        var loader = new MetaLoader({sequelize: sequelize, meta: meta})
        sequelize.sync()
            .then(loader.load.bind(loader))
            .then(resolve)
            .catch(reject)
    })
}

/**
 * Return promise that uses loader to get DEM from XML/JSON file.
 * Loaded DEM will be a value of the promise.
 */
Generator.prototype.loadDem = function _loadDem() {
    var iGenerator = this
    var demFileIn = iGenerator.opts.demFile
    var loader = iGenerator.demLoader
    return new Promise(function (resolve, reject) {
        loader.load(demFileIn)
            .then(resolve)
            .catch(reject)
    })
}

/**
 * Merge dbDEM & newDEM into one commonDEM, update META information and prepare Sequelize definitions.
 * @param $dems
 *
 */
Generator.prototype.mergeDems = function _mergeDems($dems) {
    var iGenerator = this
    var dems = $dems
    return new Promise(function (resolve, reject) {
        resolve('mergedDems');
    })
}

Generator.prototype.updateDb = function _updateDb() {
    var iGenerator = this

    return new Promise(function (resolve, reject) {
        resolve('updateDb');
        console.log('updated!');
    })
}

Generator.prototype.errorHandler = function _errorHandler(err) {
    console.log('error: ' + err);
}


module.exports = Generator