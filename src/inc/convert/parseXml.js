'use strict'
/* libraries */
var Promise = require('promise')
var parseString = require('xml2js').parseString
/* own code */
var NamespaceParser = require('./parseXml/namespace')
var parser = new NamespaceParser()

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
        var result = {'dBEAR': {}}

        if (request.dBEAR.hasOwnProperty('comment')) {
            result.dBEAR.comment = request.dBEAR.comment
        }
        result.dBEAR.namespaces = []
        if (Array.isArray(request.dBEAR.namespaces.namespace)) {
            for (var i = 0; i < request.dBEAR.namespaces.namespace.length; i++) {
                result.dBEAR.namespaces[i] = parser.parse(request.dBEAR.namespaces.namespace[i])
            }
        } else {
            result.dBEAR.namespaces[0] = parser.parse(request.dBEAR.namespaces.namespace)
        }
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

module.exports = parseXml