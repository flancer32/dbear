'use strict'
/* libraries */
/* own code */

/**
 * Parse JSON DEM and create sequelize compatible model to persist into database.
 */
/**
 * Process initial JSON and create model for Sequelize.
 * @constructor
 */
function Model() {
    /* Sequelize model data */
    this.data = {}
}

/**
 *
 * @param json
 * @private
 */
Model.prototype.parseJson = function _parseJson(json) {

    //return new Promise(function (resolve, reject) {

    function analyzeNamespaces(request) {
        function analyzeEntities(request, namespace) {
            function analyzeAttr(request) {
                var result = {};
                result.field = request.id
                if (request.type.hasOwnProperty('text')) {
                    result.type = 'VARCHAR(255)'
                } else if (request.type.hasOwnProperty('int')) {
                    result.type = 'INTEGER'
                } else {
                    console.log(("Can't get type of attribute in " + JSON.stringify(result.type)))
                }
                return result
            }

            var result = {}
            result.id = getTableAlias(request.id, namespace, 'e')
            if (request.hasOwnProperty('comment')) {
                result.comment = request.comment;
            }
            result.attributes = []
            for (var i = 0; i < request.attributes.length; i++) {
                result.attributes[i] = analyzeAttr(request.attributes[i])
            }
            return result
        }

        function analyzeRelations(request, namespace) {

            var result = {}
            result.id = getTableAlias(request.id, namespace, 'r')
            if (request.hasOwnProperty('comment')) {
                result.comment = request.comment;
            }
            result.refs = []
            for (var i = 0; i < request.refs.length; i++) {
                result.refs[i] = request.refs[i]
            }
            return result
        }

        var result = {}
        result.id = request.id
        if (request.hasOwnProperty('comment')) {
            result.comment = request.comment
        }
        /* Analyze Entities*/
        if (request.hasOwnProperty('entities')) {
            result.entities = []
            for (var i = 0; i < request.entities.length; i++) {
                result.entities[i] = analyzeEntities(request.entities[i], request.id)
            }
        }
        /* Analyze Relations */
        if (request.hasOwnProperty('relations')) {
            result.relations = []
            for (var j = 0; j < request.entities.length; j++) {
                result.relations[j] = analyzeRelations(request.relations[j], request.id)
            }
        }
        return result
    }

    var result = {}
    if (json.dBEAR.hasOwnProperty('comment')) {
        result.comment = json.dBEAR.comment
    }
    result.namespaces = []
    for (var i = 0; i < json.dBEAR.namespaces.length; i++) {
        result.namespaces[i] = analyzeNamespaces(json.dBEAR.namespaces[i])
    }
    this.data = result
    console.log("Model is created")
}

module.exports = Model