'use strict'
/* libraries */
/* own code */
var NamespaceParser = require('./namespace')
var _const = require('./constants')
/**
 *
 * @constructor
 */
function analyzeRoot(options) {
    this._options = options
    this._nameParser = new NamespaceParser(options)
    /* there are 3 mode for parsing: normal, condensed & full */
    this._mode = (options && options.mode) ? options.mode : _const.MODE.ASIS
}

/**
 * Bunch of functions to create a new valid json structure (main part)
 *
 * @param objXml
 * @return {{}}
 */
analyzeRoot.prototype.parse = function fn(objXml) {
    var result = {dBEAR:{}}

    if (objXml.dBEAR.comment) {
        result.dBEAR.comment = objXml.dBEAR.comment
    }
    result.dBEAR.namespaces = []
    if (Array.isArray(objXml.dBEAR.namespaces.namespace)) {
        for (var i = 0; i < objXml.dBEAR.namespaces.namespace.length; i++) {
            result.dBEAR.namespaces[i] = this._nameParser.parse(objXml.dBEAR.namespaces.namespace[i])
        }
    } else {
        result.dBEAR.namespaces[0] = this._nameParser.parse(objXml.dBEAR.namespaces.namespace)
    }
    return result
}

module.exports = analyzeRoot