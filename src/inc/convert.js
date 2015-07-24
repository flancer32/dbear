'use strict'

var fs = require('fs') // fs instance
var parseString = require('xml2js').parseString // xml2js method parseString instance
var prefixMatch = new RegExp(/(?!xmlns)^.*:/);
var promise = require('promise');
var dataXML; // variable for data processing
var resultJSON; //variable for json processing

/*
 ---Bunch of functions to create a new valid json structure (relations part)
 */
function analyzeRelations(request) {
    function analyzeRefs(request) {

        var result = {};

        if (request.hasOwnProperty('comment') || request.hasOwnProperty('namespace')) {
            result.comment = request.comment;
            result.namespace = request.namespace;
        }

        result.id = request.id;

        if (request.hasOwnProperty('indexes')) {
            result.indexes = [];
            if (Array.isArray(request.indexes.index)) {
                for (var i = 0; i < request.indexes.index.length; i++) {
                    result.indexes[i] = request.indexes.index[i]
                }
            } else result.indexes[0] = request.indexes.index
        }
        return result;
    }

    var result = {};
    result.id = request.id;
    if (request.hasOwnProperty('comment')) {
        result.comment = request.comment;
    }
    result.refs = [];
    if (Array.isArray(request.refs.entryRef)) {
        for (var i = 0; i < request.refs.entryRef.length; i++) {
            result.refs[i] = analyzeRefs(request.refs.entryRef[i])
        }
    } else result.refs[0] = analyzeRefs(request.refs.entryRef)

    return result;
}

/*
 ---Bunch of functions to create a new valid json structure (main part)
 */
function analyze(request) {
    function analyzeNamespaces(request) {
        function analyzeEntities(request) {
            function analyzeAttr(request) {

                var result = {};
                result.id = request.id;
                if (request.hasOwnProperty('comment')) {
                    result.comment = request.comment;
                }
                result.type = request.type;

                return result;

            }

            var result = {};
            result.id = request.id;
            if (request.hasOwnProperty('comment')) {
                result.comment = request.comment;
            }
            result.attributes = [];
            if (Array.isArray(request.attributes.attribute)) {
                for (var i = 0; i < request.attributes.attribute.length; i++) {
                    result.attributes[i] = analyzeAttr(request.attributes.attribute[i])
                }
            } else result.attributes[0] = analyzeAttr(request.attributes.attribute)

            return result;

        }

        var result = {};

        result.id = request.id;
        if (request.hasOwnProperty('comment')) {
            result.comment = request.comment;
        }
        result.entities = [];
        if (Array.isArray(request.entities.entity)) {
            for (var i = 0; i < request.entities.entity.length; i++) {
                result.entities[i] = analyzeEntities(request.entities.entity[i])
            }
        } else result.entities[0] = analyzeEntities(request.entities.entity)

        if (request.hasOwnProperty('relations')) {
            result.relations = [];
            if (Array.isArray(request.relations.relation)) {
                for (var i = 0; i < request.relations.relation.length; i++) {
                    result.relations[i] = analyzeRelations(request.relations.relation[i])
                }
            } else result.relations[0] = analyzeRelations(request.relations.relation)
        }

        return result;
    }

    var result = {"dBEAR": {}};

    if (request.dBEAR.hasOwnProperty('comment')) {
        result.dBEAR.comment = request.dBEAR.comment;
    }
    result.dBEAR.namespaces = [];
    if (Array.isArray(request.dBEAR.namespaces.namespace)) {
        for (var i = 0; i < request.dBEAR.namespaces.namespace.length; i++) {
            result.dBEAR.namespaces[i] = analyzeNamespaces(request.dBEAR.namespaces.namespace[i])
        }
    } else result.dBEAR.namespaces[0] = analyzeNamespaces(request.dBEAR.namespaces.namespace)

    return result
}

/*
 ---Main part of convertor
 */
function Converter() {
    this.run = function (param) {
        var fileIn = param.demFileIn
        var fileOut = param.demFileOut

        fs.readFile(fileIn, 'ascii', function (err, data) {
            dataXML = data

            parseString(dataXML, {
                    tagNameProcessors: [tagStripPrefix], // strip tag prefix
                    explicitArray: false, // remove arrays in child nodes
                    mergeAttrs: true, // attributes become child nodes
                    emptyTag: {}
                }, // default value of empty tag

                function (err, result) {
                    var result = analyze(result) // get a new json structure
                    resultJSON = result

                    return result // return JSON model
                })

            /* ded.json is writing to the same directory. Maybe we should create special folder? */
            fs.writeFile(fileOut, JSON.stringify(resultJSON,
                function (key, value) // callable function to strip some useless nodes
                {
                    var result = value
                    if (key == 'xmlns:tns' || key == 'xmlns:xsi' || key == 'xsi:schemaLocation') result = undefined;
                    return result;
                }, 2))

        })

    }
}

/*
 ---Function to strip tag prefix
 */
function tagStripPrefix(name) {
    /* Is this function obliged? It is used once. */
    var result = name.replace(prefixMatch, '')
    return result //function to strip tag prefix
}

module['exports'] = Converter

/* TODO create test for converter
 * #Created on 21-Jul-15
 * */

/* To launch convert.js create test.js in this directory (it's already in gitignore) with this code: */

//var converter = require('./convert.js')
//var params = require('./generate/params.js')
//var cnv = new converter
//params.demFileIn = '../../sample/01_person/sample_01.dem.xml'
//params.demFileOut = 'dem.json'
//cnv.run(params)

/* Launch it with 'node test.js' */
