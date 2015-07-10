var Sequelize = require('sequelize');

function Generator() {
    this.sequelize = {};
    this.model = {};
    this.db_entities = [];
    this.setConnection = function (db_name, login, password) {
        /* Creating conection instance (one per app) */
        console.log("Setting connection with DB...".green);
        var result = new Sequelize(db_name, login, password, {
            host: 'localhost', dialect: 'mysql', define: {
                timestamps: false, /* don't add the timestamp attributes (updatedAt, createdAt) */
                freezeTableName: true /* disable the modification of tablenames into plural */
            }
        });
        result.authenticate().then(function (result) {
            console.log("Connection established.".green)
        }, function (errors) {
            console.log("Can't authenticate. Maybe data is incorrect or DB isn't still created?".red);
            console.log(errors.red);
            result = null;
        });
        this.sequelize = result;
    };
    this.createMeta = function () {
        // CreateMetaInstances
        var meta_n = this.sequelize.define('_n', {
            name: {type: Sequelize.STRING, allowNull: false}, comment: Sequelize.STRING
        });
        var meta_e = this.sequelize.define('_e', {
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
        var meta_r = this.sequelize.define('_r', {
            name: {type: Sequelize.STRING, allowNull: false},
            allias: {type: Sequelize.STRING, allowNull: false},
            comment: Sequelize.STRING
        });
        var meta_a = this.sequelize.define('_a', {
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
    };
    this.createModel = function (request) {
        function analyzeNamespaces(request) {
            function analyzeEntities(request) {
                function analyzeAttr(request) {
                    var result = {};
                    result.field = request.id;
                    if (request.type.hasOwnProperty('text')) {
                        result.type = 'VARCHAR(255)'
                    } else if (request.type.hasOwnProperty('int')) {
                        result.type = 'INTEGER'
                    } else {
                        console.log(("Can't get type of attribute in " + JSON.stringify(result.type)).red)
                    }
                    return result;
                }

                var result = {};
                result.id = request.id;
                if (request.hasOwnProperty('comment')) {
                    result.comment = request.comment;
                }
                result.attributes = [];
                for (var i = 0; i < request.attributes.length; i++) {
                    result.attributes[i] = analyzeAttr(request.attributes[i])
                }
                return result;
            }

            var result = {};
            result.id = request.id;
            if (request.hasOwnProperty('comment')) {
                result.comment = request.comment;
            }
            result.entities = [];
            for (var i = 0; i < request.entities.length; i++) {
                result.entities[i] = analyzeEntities(request.entities[i])
            }
            return result;
        }

        var result = {};
        if (request.dBEAR.hasOwnProperty('comment')) {
            result.comment = request.dBEAR.comment;
        }
        result.namespaces = [];
        for (var i = 0; i < request.dBEAR.namespaces.length; i++) {
            result.namespaces[i] = analyzeNamespaces(request.dBEAR.namespaces[i])
        }
        this.model = result;
    };
    this.defineEntities = function (entities) {
        for (var i = 0; i < entities.length; i++) {
            this.db_entities[i] = this.sequelize.define(entities[i].id, entities[i].attributes)
        }
        ///* TODO analyze entities before defining
// * alliases
// * */
    };
    this.sync = function (forced) {
        if (forced) {
            this.sequelize.drop().then(function () {
                this.sequelize.sync();
            });
        } else {
            this.sequelize.sync();
        }
    }
}

module['exports'] = Generator;