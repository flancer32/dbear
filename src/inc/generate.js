'use strict'
var Sequelize = require('sequelize')
var Promise = require('Promise')
var meta = require('./generate/meta.js')

function Generator() {
    this.sequelize = {}
    this.model = {}
    this.db_entities = []

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
                    timestamps:      false, /* don't add the timestamp attributes (updatedAt, createdAt) */
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
            function analyzeEntities(request) {
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
                result.id = request.id
                if (request.hasOwnProperty('comment')) {
                    result.comment = request.comment;
                }
                result.attributes = []
                for (var i = 0; i < request.attributes.length; i++) {
                    result.attributes[i] = analyzeAttr(request.attributes[i])
                }
                return result
            }

            var result = {}
            result.id = request.id
            if (request.hasOwnProperty('comment')) {
                result.comment = request.comment
            }
            result.entities = []
            for (var i = 0; i < request.entities.length; i++) {
                result.entities[i] = analyzeEntities(request.entities[i])
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

    this.defineEntities = function (entities) {

        /* In 'Promises' functions 'this' is not visible.
         * This hack fix it. */
        var gen = this
        return new Promise(function (resolve, reject) {
            for (var i = 0; i < entities.length; i++) {
                console.log("Defining Entitity " + entities[i].id)
                gen.db_entities[i] = gen.sequelize.define(entities[i].id, entities[i].attributes)
                if (i + 1 == entities.length) {
                    console.log("Entities were defined!")
                    resolve('Ok!');
                }
            }
            /* TODO analyze entities before defining
             * #Created ~ 1-Jul-15
             * alliases
             * */
        })


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
            gen.defineEntities(gen.model.namespaces[0].entities)
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