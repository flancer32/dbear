'use strict'
/* libraries */
/* own code */
var ReferenceParser = require('./reference')
var _const = require('./constants')
/**
 *
 * @constructor
 */
function RelationParser(options) {
    this._options = options
    this._refParser = new ReferenceParser(options)
    /* there are 3 mode for parsing: normal, condensed & full */
    this._mode = (options && options.mode) ? options.mode : _const.MODE.ASIS
}

/**
 *
 * @param objXml
 * @return {{}}
 */
RelationParser.prototype.parse = function fn(objXml) {
    var result = {}
    result.id = objXml.id
    if (objXml.hasOwnProperty('comment')) {
        result.comment = objXml.comment
    }
    if (objXml.refs) {
        result.refs = []
        if (Array.isArray(objXml.refs.entryRef)) {
            for (var i = 0; i < objXml.refs.entryRef.length; i++) {
                result.refs[i] = this._refParser.parse(objXml.refs.entryRef[i])
            }
        } else {
            result.refs[0] = this._refParser.parse(objXml.refs.entryRef)
        }
    }
    return result

}

module.exports = RelationParser