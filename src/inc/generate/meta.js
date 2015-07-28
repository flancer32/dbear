'use strict'
/**
 * Create META-tables in DB.
 *
 * Created by Victor on 24-Jul-15.
 */
var Promise = require('Promise')
var Sequelize = require('sequelize')

var createMeta = function (sequelize) {

    return new Promise(function (resolve, reject) {
        try {
            // CreateMetaInstances
            console.log("Creating Meta...")
            var str = sequelize.STRING
            var ssstr = Sequelize.STRING
            var meta_n = sequelize.define('_namespace', {
                name: {type: Sequelize.STRING, allowNull: false},
                alias: {type: Sequelize.STRING, allowNull: false},
                comment: Sequelize.STRING
            })
            var meta_e = sequelize.define('_entity', {
                name: {type: Sequelize.STRING, allowNull: false},
                alias: {type: Sequelize.STRING, allowNull: false},
                comment: Sequelize.STRING
                /*
                 TODO Set obliged foreign key
                 #created on 07.07.15
                 It's possible to create attribute without link to parental entity.
                 http://docs.sequelizejs.com/en/1.7.0/docs/associations/#foreign-keys
                 */
            })
            var meta_r = sequelize.define('_relation', {
                name: {type: Sequelize.STRING, allowNull: false},
                alias: {type: Sequelize.STRING, allowNull: false},
                comment: Sequelize.STRING
            })
            var meta_a = sequelize.define('_attribute', {
                name: {type: Sequelize.STRING, allowNull: false},
                alias: {type: Sequelize.STRING, allowNull: false},
                type: {type: Sequelize.STRING, allowNull: false},
                comment: Sequelize.STRING
            })
            meta_e.hasMany(meta_a, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'})
            //meta_a.belongsTo(meta_e)
            meta_n.hasMany(meta_e, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'})
            //meta_e.belongsTo(meta_n)
            meta_n.hasMany(meta_r, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'})
            //meta_r.belongsTo(meta_n)

            console.log("Meta was created")
            // I suppose, here should be some check before...
            resolve('Ok.')
        } catch (err) {
            reject(err)
        }
        // sync()
        // getMetaData
        // Compare to new JSON
        // addExtraRows to Meta
    })


}

exports.createMeta = createMeta