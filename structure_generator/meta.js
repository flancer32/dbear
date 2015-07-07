/* File is used for researching Meta-tables using possibilities.*/
/* Define dependencies */
var Colors = require('colors');
var Sequelize = require('sequelize');
var Promise = require('promise');
var request = require('./request.json');
/* DB arrays*/
var db_entities = [];
var db_namespaces = [];

function setConnection(db_name, login, password) {
    /* Creating conection instance (one per app) */
    console.log("Setting connection with DB...".green);
    var result = new Sequelize(db_name, login, password, {
        host: 'localhost', dialect: 'mysql', define: {
            timestamps: false, /* don't add the timestamp attributes (updatedAt, createdAt) */
            freezeTableName: true /* disable the modification of tablenames into plural */
        }
    });
    console.log("Connection established.".green);
    return result;
}

function createMeta(JSON) {
    // CreateMetaInstances
    var meta_n = sequelize.define('_n', {
        name: {type: Sequelize.STRING, allowNull: false}, comment: Sequelize.STRING
    });
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
    });
    var meta_r = sequelize.define('_r', {
        name: {type: Sequelize.STRING, allowNull: false},
        allias: {type: Sequelize.STRING, allowNull: false},
        comment: Sequelize.STRING
    });
    var meta_a = sequelize.define('_a', {
        name: {type: Sequelize.STRING, allowNull: false},
        allias: {type: Sequelize.STRING, allowNull: false},
        type: {type: Sequelize.STRING, allowNull: false},
        comment: Sequelize.STRING
    });
    meta_e.hasMany(meta_a, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
    meta_a.belongsTo(meta_e);
    meta_n.hasMany(meta_e, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
    meta_e.belongsTo(meta_n);
    meta_n.hasMany(meta_r, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
    meta_r.belongsTo(meta_n);

    // sync()
    // getMetaData
    // Compare to new JSON
    // addExtraRows to Meta
}

// Set Connection
var sequelize = setConnection('sample_sequelize', 'sample', '3Jcftix7VycNkEYKxIDW');
createMeta(JSON);


//db_namespaces = getNamespaces(request);
sequelize.drop().then(function () {
    return sequelize.sync();
});
