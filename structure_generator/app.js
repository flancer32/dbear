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

function createEntities(entities) {
    for (var i = 0; i < entities.length; i++) {
        console.log(JSON.stringify(entities[i].attributes.blue));
        db_entities[i] = sequelize.define(entities[0].id, entities[i].attributes)
        /*TODO change this void according to new JSON structure.*/
    }
}

function getNamespaces(request) {
    var result = [];
    for (var i = 0; i < request.dBEAR.namespaces.length; i++) {
        result[i] = request.dBEAR.namespaces[i];
        console.log(result[i].id + ' - Namespace');
        console.log(result[i].comment + ' - Comment');
        for (var j = 0; j < result[i].entities.length; j++) {
            console.log(JSON.stringify(result[i].entities[j].attributes));
            db_entities[j] = sequelize.define(result[i].entities[j].id, result[i].entities[j].attributes)
        }
    }
    return result;
}

var sequelize = setConnection('sample_sequelize', 'sample', '3Jcftix7VycNkEYKxIDW');
db_namespaces = getNamespaces(request);
sequelize.drop().then(function () {
    sequelize.sync();
});
