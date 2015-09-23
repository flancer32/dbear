'use strict'
/* libraries */
var Sequelize = require('sequelize')
var Promise = require('Promise')
/* own code */
var Converter = require('./convert')
var MetaTables = require('./generate/meta/tables')
var MetaLoader = require('./generate/meta/loader')

function Generator(opt) {
    if (!(this instanceof  Generator)) return new Generator(opt)

    this.params = opt || {}
    this.converter = {}
    this.sequelize = {}
    this.model = {}
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
        var params = iGenerator.params
        var opt = {
            host:    params.dbHost,
            dialect: params.dbDialect,
            define:  {
                timestamps:      false, /* don't add the timestamp attributes (updatedAt, createdAt) */
                freezeTableName: true /* disable the modification of tablenames into plural */
            }
        }
        iGenerator.sequelize = new Sequelize(params.dbName, params.dbUser, params.dbPassword, opt)
    }


    this.createModel = function (request) {

        //return new Promise(function (resolve, reject) {

        function analyzeNamespaces(request) {
            function analyzeEntities(request, namespace) {
                function analyzeAttr(request) {
                    var result = {};
                    result.field = request.id
                    if (request.type.hasOwnProperty('text')) {
                        result.type = 'VARCHAR(255)'
                    } else if (request.type.hasOwnProperty('int')) {
                        result.type = 'INTEGER'
                    } else {
                        console.log(("Can't get type of attribute in " + JSON.stringify(result.type)))
                    }
                    return result
                }

                var result = {}
                result.id = getTableAlias(request.id, namespace, 'e')
                if (request.hasOwnProperty('comment')) {
                    result.comment = request.comment;
                }
                result.attributes = []
                for (var i = 0; i < request.attributes.length; i++) {
                    result.attributes[i] = analyzeAttr(request.attributes[i])
                }
                return result
            }

            function analyzeRelations(request, namespace) {

                var result = {}
                result.id = getTableAlias(request.id, namespace, 'r')
                if (request.hasOwnProperty('comment')) {
                    result.comment = request.comment;
                }
                result.refs = []
                for (var i = 0; i < request.refs.length; i++) {
                    result.refs[i] = request.refs[i]
                }
                return result
            }

            var result = {}
            result.id = request.id
            if (request.hasOwnProperty('comment')) {
                result.comment = request.comment
            }
            /* Analyze Entities*/
            if (request.hasOwnProperty('entities')) {
                result.entities = []
                for (var i = 0; i < request.entities.length; i++) {
                    result.entities[i] = analyzeEntities(request.entities[i], request.id)
                }
            }
            /* Analyze Relations */
            if (request.hasOwnProperty('relations')) {
                result.relations = []
                for (var j = 0; j < request.entities.length; j++) {
                    result.relations[j] = analyzeRelations(request.relations[j], request.id)
                }
            }
            return result
        }

        var result = {}
        if (request.dBEAR.hasOwnProperty('comment')) {
            result.comment = request.dBEAR.comment
        }
        result.namespaces = []
        for (var i = 0; i < request.dBEAR.namespaces.length; i++) {
            result.namespaces[i] = analyzeNamespaces(request.dBEAR.namespaces[i])
        }
        this.model = result
        console.log("Model was created")
        //resolve('Ok!');
        //})

    }

    function defineEntities(entities, options, gen) {

        /* In 'Promises' functions 'this' is not visible.
         * This hack fix it. */
        //var gen = this
        //return new Promise(function (resolve, reject) {
        for (var i = 0; i < entities.length; i++) {
            console.log("Define new entity :  " + entities[i].id)
            gen.sequelize.define(entities[i].id, entities[i].attributes, options)
            //if (i + 1 == entities.length) {
            //    console.log("Entities were defined!")
            //    resolve('Ok!');
            //}
        }
        /* TODO analyze entities before defining
         * #Created ~ 1-Jul-15
         * aliases
         * */
        //})


    }

    function defineRelations(relations, options, gen, namespace) {
        var name = ''
        for (var i = 0; i < relations.length; i++) {
            console.log("Define new relation :  " + relations[i].id)
            gen.sequelize.define(relations[i].id)

            /* TODO This part should be separated and moved after all tables defining
             * #Created on 28-Jul-15
             * There might be reference to non-created entity/relation */
            for (var j = 0; j < relations[i].refs.length; j++) {
                if (relations[i].refs[j].hasOwnProperty('namespace')) {
                    name = getTableAlias(relations[i].refs[j].id, relations[i].refs[j].namespace, 'e')
                } else {
                    name = getTableAlias(relations[i].refs[j].id, namespace, 'e')
                }
                gen.sequelize.models[name].belongsTo(gen.sequelize.models[relations[i].id])
            }

        }
        //gen.db_entities.belongsTo(gen.db_relations[0])
        //name = getTableAlias(relations[0].refs[0].id, namespace, 'e')
        //gen.sequelize.models[name].belongsTo(gen.sequelize.models[relations[0].id])
        //gen.db_entities.(entities[1].id).belongsTo(gen.db_relations[0])
    }

    this.defineStructure = function (model) {
        /* Define all relations and entities in this model*/
        for (var i = 0; i < model.namespaces.length; i++) {
            if (model.namespaces[i].entities !== undefined) {
                defineEntities(model.namespaces[i].entities, null, this)
            }
            if (model.namespaces[i].relations !== undefined) {
                defineRelations(model.namespaces[i].relations, null, this, model.namespaces[i].id)
            }
        }
    }

    function getTableAlias(origin, namespace, type) {
        /*
         * Example:
         * Origin = customer
         * Namespace = core
         * Type = e
         * result = core_e_customer
         * */
        /* TODO create complex analyze here!
         #Created on 27-Jul-15
         * Connection to Meta
         * Short namespaces
         * */
        var result = namespace + '_' + type + '_' + origin;
        return result;
    }

    this.synchronize = function () {
        console.log("Sync()...")
        /* In 'then' functions 'this' is not visible.
         * This hack fix it. */
        var gen = this
        /* Erase all structure in DB. This should be changed to optional. */
        gen.sequelize.drop().then(function () {
            /* Return Promise*/
            return gen.sequelize.sync()
        }).then(function () {
            console.log("Good bye!")
            /* Close connection */
            gen.sequelize.close()
        })


    }

    /**
     *
     * @param json
     * @param err
     * @return {*|exports|module.exports}
     */
    this.processJson = function (json) {
        /* create shortcut for Generator */
        var gen = this
        /* ... then return promise function that performs requested operations */
        return new Promise(function (resolve, reject) {
            /* setConnection creates this.sequelize, that is using further. */
            gen.setConnection(opt).then(function () {
                /*Parse JSON and create Meta information.*/
                gen.createModel(json)
                meta.createMeta(gen.sequelize)
            }).then(function () {
                /* Using this.model define entities. */
                gen.defineStructure(gen.model)
            }).then(function () {
                /* Finally, sync all structure with DB. */
                gen.synchronize()
                resolve()
            }).catch(function (err) {
                console.log(err);
                reject(err)
            })
        })
    }

    //this.run = function (params) {
    //    /* save parameters and create shortcut for Generator */
    //    this.params = params
    //    var iGenerator = this
    //
    //    /* Convert XML request to JSON format. */
    //    var Converter = iGenerator.getConverter()
    //    var converter = new Converter()
    //    var paramsConv = require('./convert/params')
    //    paramsConv.demFileIn = params.demFile
    //    paramsConv.skipWriteOut = true
    //    converter.run(paramsConv)
    //        .then(iGenerator.processJson)
    //        .catch(function (err) {
    //            console.log('err' + err)
    //            reject(err)
    //        }
    //    )
    //}

}

/**
 * Perform all actions to generate addition domain structure defined in the new DEM.
 */
Generator.prototype.run = function _run() {
    /* create shortcut for Generator itself */
    var iGenerator = this
    var params = iGenerator.params
    /* compose converter parameters and run converter */
    var paramsConv = require('./convert/params')
    paramsConv.demFileIn = params.demFile
    paramsConv.skipWriteOut = true
    /* read META data from DB (dbDEM) and input data from file (newDEM) ... */
    Promise.all([
        iGenerator.readMeta(),
        iGenerator.loadDem()
    ])
        .then(iGenerator.mergeDems)
        .then(iGenerator.updateDb)
        .catch(iGenerator.errorHandler)
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
            .then(loader.load)
            .then(resolve)
            .catch(reject)
    })
}

/**
 * Load DEM and convert to JSON format.
 */
Generator.prototype.loadDem = function _loadDem() {
    var iGenerator = this
    return Promise.resolve('loadDem')
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