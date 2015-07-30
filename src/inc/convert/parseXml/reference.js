'use strict'
/* libraries */
/* own code */
//var AttributeParser = require('./attribute')
var _const = require('./constants')
/**
 *
 * @constructor
 */
function ReferenceParser(options) {
    this._options = options
    //this._attrParser = new AttributeParser(options)
    /* there are 3 mode for parsing: normal, condensed & full */
    this._mode = (options && options.mode) ? options.mode : _const.MODE.ASIS
}

/**
 *
 * @param objXml
 * @return {{}}
 */
ReferenceParser.prototype.parse = function _parse(objXml) {
    var result = {}
    if (objXml.comment) {
        result.comment = objXml.comment
    }
    if (objXml.namespace) {
        result.namespace = objXml.namespace
    }
    result.id = objXml.id
    if (objXml.alias) {
        result.alias = objXml.alias
    }
    if (objXml.indexes) {
        result.indexes = []
        if (Array.isArray(objXml.indexes.index)) {
            for (var i = 0; i < objXml.indexes.index.length; i++) {
                result.indexes[i] = objXml.indexes.index[i]
            }
        } else {
            result.indexes[0] = objXml.indexes.index
        }
    }
    return result

}

module.exports = ReferenceParser