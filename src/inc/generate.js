'use strict'
/* libraries */
var Sequelize = require('sequelize')
var Promise = require('Promise')
/* own code */
var Converter = require('./convert')
var MetaTables = require('./generate/meta/tables')
var MetaLoader = require('./generate/meta/loader')

function Generator(opts) {
    if (!(this instanceof  Generator)) return new Generator(opts)

    this.opts = opts || {}
    this.converter = {}
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
        var opts = iGenerator.opts
        var opt = {
            host:    opts.dbHost,
            dialect: opts.dbDialect,
            define:  {
                timestamps:      false, /* don't add the timestamp attributes (updatedAt, createdAt) */
                freezeTableName: true /* disable the modification of tablenames into plural */
            }
        }
        iGenerator.sequelize = new Sequelize(opts.dbName, opts.dbUser, opts.dbPassword, opt)
    }

}

/**
 * Perform all actions to generate addition domain structure defined in the new DEM.
 */
Generator.prototype.run = function _run() {
    /* create shortcut for Generator itself */
    var iGenerator = this
    var opts = iGenerator.opts
    /* compose converter parameters and run converter */
    var optsConv = {}
    optsConv.demFileIn = opts.demFile
    optsConv.skipWriteOut = true
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
        var meta = new MetaTables({sequelize: sequelize})
        var loader = new MetaLoader({sequelize: sequelize, meta: meta})
        sequelize.sync()
            .then(loader.load.bind(loader))
            .then(resolve)
            .catch(reject)
    })
}

/**
 * Load DEM from file (XML/JSON) and convert to JSON format if required.
 */
Generator.prototype.loadDem = function _loadDem() {
    var iGenerator = this
    return new Promise(function (resolve, reject) {
        /* read META data */
        var sequelize = iGenerator.sequelize;
        var meta = new MetaTables({sequelize: sequelize})
        var loader = new MetaLoader({sequelize: sequelize, meta: meta})
        sequelize.sync()
            .then(loader.load.bind(loader))
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