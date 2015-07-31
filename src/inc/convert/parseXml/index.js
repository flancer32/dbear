'use strict'
/* librarires */
/* own code */
var _const = require('./constants')
/**
 *
 * @constructor
 */
function IndexParser(options) {
    this._options = options
    /* there are 3 mode for parsing: normal, condensed & full */
    this._mode = (options && options.mode) ? options.mode : _const.MODE.ASIS
}

/**
 *
 * @param objXml
 * @return {{}}
 */
IndexParser.prototype.parse = function fn(objXml) {
    var result = {}

    result.id = objXml.id

    if (objXml.comment) {
        result.comment = objXml.comment
    }

    if ('position' in objXml) {
        result.position = objXml.position
    }

    return result
}

module.exports = IndexParser
