'use strict'
/* libraries */
/* own code */
var NamespaceParser = require('./namespace')
var parser = new NamespaceParser()

/*
 * ---Bunch of functions to create a new valid json structure (main part)
*/
function analyzeRoot(objXml) {
    var result = {'dBEAR': {}}

    if (objXml.dBEAR.hasOwnProperty('comment')) {
        result.dBEAR.comment = objXml.dBEAR.comment
    }
    result.dBEAR.namespaces = []
    if (Array.isArray(objXml.dBEAR.namespaces.namespace)) {
        for (var i = 0; i < objXml.dBEAR.namespaces.namespace.length; i++) {
            result.dBEAR.namespaces[i] = parser.parse(objXml.dBEAR.namespaces.namespace[i])
        }
    } else {
        result.dBEAR.namespaces[0] = parser.parse(objXml.dBEAR.namespaces.namespace)
    }
    return result
}

module.exports = analyzeRoot