'use strict'
/* libraries */
/* own code */
var IndexParser = require('./index')
var _const = require('./constants')
/**
 *
 * @constructor
 */
function ReferenceParser(options) {
    this._options = options
    this._indParser = new IndexParser(options)
    /* there are 3 mode for parsing: normal, condensed & full */
    this._mode = (options && options.mode) ? options.mode : _const.MODE.ASIS
}

/**
 *
 * @param objXml
 * @return {{}}
 */
ReferenceParser.prototype.parse = function fn(objXml) {
    var result = {}

    if (objXml.isEntity) {
        result.isEntity = objXml.isEntity
    }

    result.id = objXml.id

    if (objXml.alias) {
        result.alias = objXml.alias
    }

    if (objXml.comment) {
        result.comment = objXml.comment
    }

    if (objXml.namespace) {
        result.namespace = objXml.namespace
    }

    if (objXml.indexes) {
        result.indexes = []
        if (Array.isArray(objXml.indexes.index)) {
            for (var i = 0; i < objXml.indexes.index.length; i++) {
                result.indexes[i] = this._indParser.parse(objXml.indexes.index[i])
            }
        } else {
            result.indexes[0] = this._indParser.parse(objXml.indexes.index)
        }
    }

    return result
}

module.exports = ReferenceParser