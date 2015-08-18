'use strict'
/* libraries */
/* own code */
var Sequelize = require('sequelize')
/**
 * Parse DEM attribute and create Sequelize definition for the table's field.
 * @constructor
 */
function Attribute() {

}

/**
 * Input JSON (DEM attribut):
 {
     "id": "NameFirst",
     "alias": "nfirst",
     "comment": "Comment is here",
     "type": {},
     "indexes": {
         "index": [
             {"id": "FirstId", "comment": "First Comment", "position": 0},
             {"id": "SecondId", "comment": "Second Comment", "position": 1},
             {"id": "ThirdId", "comment": "Third Comment", "position": 2}
         ]
     }
 }
 *
 * Result data:
 {
     column:     "NameFirst",
     definition: {
         allowNull:     false,
         autoIncrement: true,
         comment:       "I'm a comment!",
         defaultValue:  true,
         field:         "field_with_underscores",
         primaryKey:    true,
         type:          Sequelize.BOOLEAN,
         unique:        [true | 'compositeIndex']
     }
 }
 *
 * See http://sequelize.readthedocs.org/en/latest/docs/models-definition/#definition
 *
 * @param jsDemAttr
 * @param seqModel
 * @return {{}}
 * @private
 */
Attribute.prototype.parseJson = function _parseJson(jsDemAttr, seqModel) {
    var result = {column: '', definition: {}};
    var def = result.definition
    /* process common attribute's properties */
    result.column = jsDemAttr.id
    def.field = jsDemAttr.id
    if ('comment' in jsDemAttr) def.comment = jsDemAttr.comment
    /* parse type data */
    if ('type' in jsDemAttr) {
        var type = jsDemAttr.type
        var typeData
        if (type.hasOwnProperty('binary')) {
            typeData = type.binary
            def.type = Sequelize.BLOB
        } else if (type.hasOwnProperty('boolean')) {
            typeData = type.boolean
            def.type = Sequelize.BOOLEAN
        } else if (type.hasOwnProperty('datetime')) {
            typeData = type.datetime
            def.type = Sequelize.DATE
        } else if (type.hasOwnProperty('integer')) {
            typeData = type.integer
            def.type = Sequelize.INTEGER
            if (('isUnsigned' in typeData) && (typeData.isUnsigned)) def.type = Sequelize.INTEGER.UNSIGNED
            if (('isAutoincrement' in typeData) && (typeData.isAutoincrement)) def.autoIncrement = true
        } else if (type.hasOwnProperty('numeric')) {
            typeData = type.numeric
            if (('precision' in typeData) && ('scale' in typeData)) {
                /* both precision and scale should present */
                def.type = Sequelize.DECIMAL(typeData.precision, typeData.scale)
            } else {
                def.type = Sequelize.DECIMAL
            }
        } else if (type.hasOwnProperty('option')) {
            typeData = type.option
            def.type = Sequelize.ENUM
        } else if (type.hasOwnProperty('text')) {
            typeData = type.text
            if ('length' in typeData) {
                def.type = Sequelize.STRING(typeData.length)
            } else {
                def.type = Sequelize.STRING
            }
        } else {
            console.log(("Can't resolve type '" + JSON.stringify(result.type) + "' of attribute '" + jsDemAttr.id + "'."))
            throw 'Unknown attribute type.'
        }
        /* parse common properties for the type data */
        if ('isPrimaryKey' in typeData) def.primaryKey = typeData.isPrimaryKey
        if ('isNullable' in typeData) def.allowNull = typeData.isNullable
        if ('defaultValue' in typeData) def.defaultValue = typeData.defaultValue

    } else {
        throw 'Attribute type is missed.'
    }


    return result
}

module.exports = Attribute