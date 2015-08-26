'use strict'
/* libraries */
var Sequelize = require('sequelize')
/* own code */
var Attribute = require('./attribute')
/**
 * Parse DEM entity and create Sequelize definition for the table itself.
 * @constructor
 */
function Entity() {
    this._parserAttr = new Attribute()
}

/**
 * Input JSON (DEM entity):
 {
   "id": "Person",
   "alias": "person",
   "comment": "Person basic entity with 2 attributes.",
   "attributes": [...]
 }
 *
 * Result data:
 {
     table:     "NameFirst",
     columns:   {...},
     options:   {...}
 }
 *
 * See http://sequelize.readthedocs.org/en/latest/docs/models-definition/#configuration
 *
 * @param jsDem
 * @param seqModel
 * @return {{}}
 * @private
 */
Entity.prototype.parseJson = function _parseJson(jsDem, seqModel) {
    var result = {table: '', columns: {}, options: {}};
    /* process common properties */
    result.table = jsDem.id
    var options = result.options
    /* parse columns */
    if (jsDem.attributes) {
        var demAttrs = jsDem.attributes
        var columns = result.columns
        var i, len, parsedAttr;
        for (i = 0, len = demAttrs.length; i < len; ++i) {
            parsedAttr = this._parserAttr.parseJson(demAttrs[i])
            columns[parsedAttr.column] = parsedAttr.definition
        }
    }
    return result
}

module.exports = Entity