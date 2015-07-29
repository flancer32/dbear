'use strict'
/* libraries */
/* own code */
var _const = require('./constants')
/**
 *
 * @constructor
 */
function AttributeParser(options) {
    this._options = options
    /* there are 3 mode for parsing: normal, condensed & full */
    this._mode = (options && options.mode) ? options.mode : _const.MODE.NORMAL
}

/**
 *
 * @param objXml
 * @return {{}}
 */
AttributeParser.prototype.parse = function fn(objXml) {

    var result = {}
    result.id = objXml.id
    result.alias = objXml.alias
    if (objXml.hasOwnProperty('comment')) {
        result.comment = objXml.comment
    }
    result.type = objXml.type

    return result
}

module.exports = AttributeParser