'use strict'
/* libraries */
var Promise = require('promise')
var parseString = require('xml2js').parseString
/* own code */
var EntityParser = require('./parseXml/entity')
var entityParser = new EntityParser()

function parseXml(data) {
    /**
     * Function to strip tag prefix.
     *
     * @param name
     * @return {*|string|void|XML}
     */
    function tagStripPrefix(name) {
        var prefixMatch = new RegExp(/(?!xmlns)^.*:/)
        /* Is this function obliged? It is used once. */
        var result = name.replace(prefixMatch, '')
        return result
    }


    /*
     ---Bunch of functions to create a new valid json structure (main part)
     */
    function analyze(request) {
        function analyzeNamespaces(request) {

            var result = {}

            result.id = request.id
            result.alias = request.alias
            if (request.hasOwnProperty('comment')) {
                result.comment = request.comment
            }
            result.entities = []
            if (Array.isArray(request.entities.entity)) {
                for (var i = 0; i < request.entities.entity.length; i++) {
                    result.entities[i] = entityParser.parse(request.entities.entity[i])
                }
            } else result.entities[0] = entityParser.parse(request.entities.entity)

            if (request.hasOwnProperty('relations')) {
                result.relations = []
                if (Array.isArray(request.relations.relation)) {
                    for (var j = 0; j < request.relations.relation.length; j++) {
                        result.relations[j] = analyzeRelations(request.relations.relation[j])
                    }
                } else result.relations[0] = analyzeRelations(request.relations.relation)
            }

            return result
        }

        var result = {'dBEAR': {}}

        if (request.dBEAR.hasOwnProperty('comment')) {
            result.dBEAR.comment = request.dBEAR.comment
        }
        result.dBEAR.namespaces = []
        if (Array.isArray(request.dBEAR.namespaces.namespace)) {
            for (var i = 0; i < request.dBEAR.namespaces.namespace.length; i++) {
                result.dBEAR.namespaces[i] = analyzeNamespaces(request.dBEAR.namespaces.namespace[i])
            }
        } else result.dBEAR.namespaces[0] = analyzeNamespaces(request.dBEAR.namespaces.namespace)

        return result
    }


    return new Promise(function (resolve, reject) {
        parseString(data, {
            tagNameProcessors: [tagStripPrefix], // strip tag prefix
            explicitArray:     false, // remove arrays in child nodes
            mergeAttrs:        true, // attributes become child nodes
            emptyTag:          {}
        }, function (err, result) {
            var resultJSON = analyze(result)
            if (err) {
                reject(err)
            } else {
                resolve(resultJSON)
            }
        })
    })
}

/*
 ---Bunch of functions to create a new valid json structure (relations part)
 */
function analyzeRelations(request) {
    function analyzeRefs(request) {

        var result = {}

        if (request.hasOwnProperty('comment') || request.hasOwnProperty('namespace')) {
            result.comment = request.comment
            result.namespace = request.namespace
        }

        result.id = request.id

        if (request.hasOwnProperty('indexes')) {
            result.indexes = []
            if (Array.isArray(request.indexes.index)) {
                for (var i = 0; i < request.indexes.index.length; i++) {
                    result.indexes[i] = request.indexes.index[i]
                }
            } else result.indexes[0] = request.indexes.index
        }
        return result
    }

    var result = {}
    result.id = request.id
    if (request.hasOwnProperty('comment')) {
        result.comment = request.comment
    }
    result.refs = []
    if (Array.isArray(request.refs.entryRef)) {
        for (var i = 0; i < request.refs.entryRef.length; i++) {
            result.refs[i] = analyzeRefs(request.refs.entryRef[i])
        }
    } else result.refs[0] = analyzeRefs(request.refs.entryRef)

    return result
}

module.exports = parseXml