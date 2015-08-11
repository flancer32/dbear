'use strict'
/* libraries */
/* own code */

/**
 * Parse DEM attribute and update Sequelize model.
 * @constructor
 */
function Attribute() {

}

/**
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
 * @param jsDemAttr
 * @param seqModel
 * @return {{}}
 * @private
 */
Attribute.prototype.parseJson = function _parseJson(jsDemAttr, seqModel) {
    var result = {};
    /* */
    result.field = jsDemAttr.id

    if (jsDemAttr.type.hasOwnProperty('text')) {
        result.type = 'VARCHAR(255)'
    } else if (jsDemAttr.type.hasOwnProperty('int')) {
        result.type = 'INTEGER'
    } else {
        console.log(("Can't resolve type '" + JSON.stringify(result.type) + "' of attribute '" + result.field + "'."))
    }
    return result
}

module.exports = Attribute