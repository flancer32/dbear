'use strict'
/* libraries */
var Sequelize = require('sequelize')
/* own code */
var Entity = require('./entity')
/**
 * Parse DEM namespace and create Sequelize definition for the table itself.
 * @constructor
 */
function Namespace() {
    this._parserEntity = new Entity()
}

/**
 * Input JSON (DEM namespace):
 {
     "id": "com.flancer32.dbear.sample.core",
     "alias": "core",
     "comment": "Base namespace for samples.",
     "entities": [],
     "relations": []
 }
 *
 * Result data:
 {
     namespace: "com.flancer32.dbear.sample.core",
     alias:     "core",
     tables:    []
 }
 *
 * @param jsDem
 * @param seqModel
 * @return {{}}
 * @private
 */
Namespace.prototype.parseJson = function _parseJson(jsDem, seqModel) {
    var result = {namespace: '', alias: '', comment: '', tables: []};
    /* process common properties */
    result.namespace = jsDem.id
    if (jsDem.alias) result.alias = jsDem.alias
    if (jsDem.comment) result.comment = jsDem.comment
    var tables = result.tables
    /* parse entities */
    if (jsDem.entities) {
        var demEntities = jsDem.entities
        var i, len, parsedEntity;
        for (i = 0, len = demEntities.length; i < len; ++i) {
            parsedEntity = this._parserEntity.parseJson(demEntities[i])
            tables.push(parsedEntity)
        }
    }
    return result
}

module.exports = Namespace