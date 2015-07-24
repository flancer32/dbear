/**
 * Created by Victor on 24-Jul-15.
 */
var Sequelize = require('sequelize')

exports.createMeta = function (sequelize) {
    /* In 'Promises' functions 'this' is not this but that - function's scope itself.
     * This hack fix it. */
    return new Promise(function (resolve, reject) {
        try {
            // CreateMetaInstances
            console.log("Creating Meta...")
            var meta_n = sequelize.define('_n', {
                name: {type: Sequelize.STRING, allowNull: false}, comment: Sequelize.STRING
            })
            var meta_e = sequelize.define('_e', {
                //id: {type: Sequelize.INTEGER(11).UNSIGNED, allowNull: false},
                name: {type: Sequelize.STRING, allowNull: false},
                allias: {type: Sequelize.STRING, allowNull: false},
                comment: Sequelize.STRING
                /*
                 TODO Set obliged foreign key
                 #created on 07.07.15
                 It's possible to create attribute without link to parental entity.
                 http://docs.sequelizejs.com/en/1.7.0/docs/associations/#foreign-keys
                 */
            })
            var meta_r = sequelize.define('_r', {
                name: {type: Sequelize.STRING, allowNull: false},
                allias: {type: Sequelize.STRING, allowNull: false},
                comment: Sequelize.STRING
            })
            var meta_a = sequelize.define('_a', {
                name: {type: Sequelize.STRING, allowNull: false},
                allias: {type: Sequelize.STRING, allowNull: false},
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