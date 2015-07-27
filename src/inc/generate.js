'use strict'
var Sequelize = require('sequelize')
var Promise = require('Promise')
var meta = require('./generate/meta.js')

function Generator() {
    this.sequelize = {}
    this.model = {}
    this.db_entities = []
    this.db_relations = []

    this.getOrm = function () {
        /* to use in tests . */
        return Sequelize
    }

    this.setConnection = function (params) {

        /* Creating conection instance (one per app) */
        console.log("Setting connection with DB...")

        /* In 'Promises' functions 'this' is not visible.
         * This hack fix it. */
        var gen = this
        var Orm = this.getOrm()

        return new Promise(function (resolve, reject) {
            var opt = {
                host: params.dbHost, dialect: params.dbDialect, define: {
                    timestamps: false, /* don't add the timestamp attributes (updatedAt, createdAt) */
                    freezeTableName: true /* disable the modification of tablenames into plural */
                }
            }
            gen.sequelize = new Orm(params.dbName, params.dbUser, params.dbPassword, opt)
            gen.sequelize.authenticate().then(function (result) {
                console.log("Connection established.")
                resolve('Connection established')

            }, function (errors) {
                console.log("Can't authenticate. Maybe data is incorrect or DB isn't still created?")
                console.log(errors)
                gen.sequelize = null
                reject(errors)
            })
        })


    };


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
                for (i = 0; i < request.entities.length; i++) {
                    result.relations[i] = analyzeRelations(request.relations[i], request.id)
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

    function defineEntities(entities, options) {

        /* In 'Promises' functions 'this' is not visible.
         * This hack fix it. */
        var gen = this
        //return new Promise(function (resolve, reject) {
            for (var i = 0; i < entities.length; i++) {
                console.log("Define new entity :  " + entities[i].id)
                gen.db_entities[i] = gen.sequelize.define(entities[i].id, entities[i].attributes, options)
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

    function defineRelations(relations) {
        for (var i = 0; i < relations.length; i++) {
            console.log("Define new relation :  " + relations[i].id)
            this.db_relations = this.sequelize.define(relations[i].id)
        }
    }

    this.defineStructure = function (model) {
        for (var i = 0; i < model.dbear.namespaces.length; i++) {
            if (model.dbear.namespaces[i].entities.length != 0) {
                defineEntities(model.dbear.namespaces[i].entities)
            }
            if (model.dbear.namespaces[i].relations.length != 0) {
                defineRelations(model.dbear.namespaces[i].relations)
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

    this.run = function (params) {
        /* Get request in JSON format. */
        /* todo: we need to analyze format of the DEM file and to use converter to get JSON from XML (as separate function)*/
        var request = getJsonFromDemFile(params.demFile)
        /* In 'then' functions 'this' is not visible.
         * This hack fix it. */
        var gen = this
        /* setConnection creates this.sequelize, that is using further. */
        gen.setConnection(params).then(function () {
            /*Parse JSON and create Meta information.*/
            gen.createModel(request)
            meta.createMeta(gen.sequelize)
        }).then(function () {
            /* Using this.model define entities. */
            gen.defineStructure(this.model)
        }).then(function () {
            /* Finally, sync all structure with DB. */
            gen.synchronize()
        }).catch(function (err) {
            console.log(err);
        })
    }

    /**
     * @param path
     * @returns {object}
     */
    function getJsonFromDemFile(path) {
        var result
        if (path.slice(-3) == 'xml') {
            console.log("DEM as xml file is loaded")
            /* Convert xml to JSON*/
            var converter = require('./convert.js')
            var params = require('./convert/params.js')
            var cnv = new converter
            params.demFileIn = path
            params.demFileOut = './dem.json'
            cnv.run(params)
            /* TODO This part don't work. */
            result = require('./dem.json')
        } else if (path.slice(-4) == 'json') {
            console.log("DEM as JSON file is loaded")
            /* Get JSON */
            result = require(path)
        } else {
            /* Throw error*/
        }
        /* TODO why we need this?
         * #Created on 23-Jul-15
         * Delete on 6-Aug-15 if unneeded
         * */
        //var self = this
        return result;
    }
}

module.exports = Generator