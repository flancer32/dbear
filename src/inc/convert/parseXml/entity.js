'use strict'
/* libraries */
/* own code */
var AttributeParser = require('./attribute')
var _const = require('./constants')
/**
 *
 * @constructor
 */
function EntityParser(options) {
    this._options = options
    this._attrParser = new AttributeParser(options)
    /* there are 3 mode for parsing: normal, condensed & full */
    this._mode = (options && options.mode) ? options.mode : _const.MODE.ASIS
}

/**
 *
 * @param objXml
 * @return {{}}
 */
EntityParser.prototype.parse = function fn(objXml) {

    var result = {attributes: []}
    result.id = objXml.id
    result.alias = objXml.alias
    if (objXml.hasOwnProperty('comment')) {
        result.comment = objXml.comment
    }
    if (objXml.attributes) {
        if (Array.isArray(objXml.attributes.attribute)) {
            for (var i = 0; i < objXml.attributes.attribute.length; i++) {
                result.attributes[i] = this._attrParser.parse(objXml.attributes.attribute[i])
            }
        } else {
            result.attributes[0] = this._attrParser.parse(objXml.attributes.attribute)
        }
    }
    return result
}

module.exports = EntityParser