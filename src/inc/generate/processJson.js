'use strict'
/* libraries */
var Promise = require('promise')
/* own code */

/**
 *
 * @constructor
 */
function JsonProcessor(generator) {
    this.generator = generator
}

/**
 *
 * @param json
 * @private
 */
JsonProcessor.prototype.process = function _process(json) {
    var gen = this.generator
    /* ... then return promise function that performs requested operations */
    return new Promise(function (resolve, reject) {
        /* setConnection creates this.sequelize, that is using further. */
        gen.setConnection(params).then(function () {
            /*Parse JSON and create Meta information.*/
            gen.createModel(json)
            meta.createMeta(gen.sequelize)
        }).then(function () {
            /* Using this.model define entities. */
            gen.defineStructure(gen.model)
        }).then(function () {
            /* Finally, sync all structure with DB. */
            gen.synchronize()
            resolve()
        }).catch(function (err) {
            console.log(err);
            reject(err)
        })
    })
}

module.exports = JsonProcessor