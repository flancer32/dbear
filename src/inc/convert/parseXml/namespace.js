'use strict'
/* libraries */
/* own code */
var EntityParser = require('./entity')
var RelationParser = require('./relation')
var _const = require('./constants')
/**
 *
 * @constructor
 */
function NamespaceParser(options) {
    this._options = options
    this._entityParser = new EntityParser(options)
    this._relationParser = new RelationParser(options)
    /* there are 3 mode for parsing: normal, condensed & full */
    this._mode = (options && options.mode) ? options.mode : _const.MODE.ASIS
}

/**
 *
 * @param objXml
 * @return {{}}
 */
NamespaceParser.prototype.parse = function fn(objXml) {
    var result = {}

    result.id = objXml.id

    if (objXml.alias) {
        result.alias = objXml.alias
    }

    if (objXml.comment) {
        result.comment = objXml.comment
    }

    if (objXml.entities) {
        result.entities = []
        if (Array.isArray(objXml.entities.entity)) {
            for (var i = 0; i < objXml.entities.entity.length; i++) {
                result.entities[i] = this._entityParser.parse(objXml.entities.entity[i])
            }
        } else {
            result.entities[0] = this._entityParser.parse(objXml.entities.entity)
        }
    }

    if (objXml.relations) {
        result.relations = []
        if (Array.isArray(objXml.relations.relation)) {
            for (var j = 0; j < objXml.relations.relation.length; j++) {
                result.relations[j] = this._relationParser.parse(objXml.relations.relation[j])
            }
        } else {
            result.relations[0] = this._relationParser.parse(objXml.relations.relation)
        }
    }

    return result
}


module.exports = NamespaceParser