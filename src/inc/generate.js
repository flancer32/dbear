'use strict'
/* libraries */
var Sequelize = require('sequelize')
var Promise = require('Promise')
/* own code */
var Converter = require('./convert')
var MetaTables = require('./generate/meta/tables')
var MetaLoader = require('./generate/meta/loader')
var DemLoader = require('./generate/loadDem')
var DemMerger = require('./generate/mergeDem')
/**
 * @return {Generator}
 * @constructor
 */
function Generator() {
    /* allow to use Object & Function notations to init variables */
    if (!(this instanceof  Generator)) return new Generator()
    /* define properties */
    this.opts = {}
    this.converter = {}
    this.demLoader = {}
    this.demMerger = {}
    this.sequelize = {}
    this.metaTables = {}
    this.metaLoader = {}
}

/**
 * $opts = {
 *  dbHost:     '',
 *  dbDialect:  '',
 *  dbName:     '',
 *  dbUser:     '',
 *  dbPassword: '',
 *  demFile:    'absolute path to file with XML/JSON DEM',
 * }
 *
 * @param $opts
 * @private
 */
Generator.prototype.init = function _init($opts) {
    this.opts = $opts
    this.converter = new Converter()
    this.demLoader = new DemLoader()
    this.demMerger = new DemMerger()
    this.metaTables = new MetaTables()
    this.metaLoader = new MetaLoader()
    /* prepare options to initialize sequelize */
    var ormOpts = {
        host:     this.opts.dbHost,
        dialect:  this.opts.dbDialect,
        define:  {
            timestamps:      false, /* don't add the timestamp attributes (updatedAt, createdAt) */
            freezeTableName: true /* disable the modification of tablenames into plural */
        }
    }
    this.sequelize = new Sequelize( this.opts.dbName,  this.opts.dbUser,  this.opts.dbPassword, ormOpts)
    this.metaTables.init({sequelize: this.sequelize})
}
/**
 * Return promise that performs all actions to generate addition domain structure defined in the new DEM.
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
        var loader = iGenerator.metaLoader
        iGenerator.sequelize.sync()
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
    var opts = {}
    opts.dbDem = $dems[0]   // iGenerator.readMeta()
    opts.newDem = $dems[1] // iGenerator.loadDem()
    return new Promise(function (resolve, reject) {
        iGenerator.demMerger.merge(opts).then(resolve).catch(reject)
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