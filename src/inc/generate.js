var Sequelize = require('sequelize');
var Promise = require('Promise');

function Generator() {
    this.sequelize = {};
    this.model = {};
    this.db_entities = [];

    this.getOrm = function () {
        return Sequelize
    }

    this.setConnection = function (params) {
        /* Creating conection instance (one per app) */
        console.log("Setting connection with DB...");
        var Orm = this.getOrm()
        var gen = this
        return new Promise(function (resolve, reject) {
            var opt = {
                host: params.dbHost, dialect: params.dbDialect, define: {
                    timestamps:      false, /* don't add the timestamp attributes (updatedAt, createdAt) */
                    freezeTableName: true /* disable the modification of tablenames into plural */
                }
            }
            gen.sequelize = new Orm(params.dbName, params.dbUser, params.dbPassword, opt);

            gen.sequelize.authenticate().then(function (result) {
                console.log("Connection established.");
                resolve('Connectin established');

            }, function (errors) {
                console.log("Can't authenticate. Maybe data is incorrect or DB isn't still created?");
                console.log(errors);
                gen.sequelize = null;
                reject(errors);
            });
        })


    };
    this.createMeta = function () {

        return new Promise(function (resolve, reject) {
            // CreateMetaInstances
            console.log("Creating Meta...")
            var meta_n = this.sequelize.define('_n', {
                name: {type: Sequelize.STRING, allowNull: false}, comment: Sequelize.STRING
            });
            var meta_e = this.sequelize.define('_e', {
                //id: {type: Sequelize.INTEGER(11).UNSIGNED, allowNull: false},
                name:    {type: Sequelize.STRING, allowNull: false},
                allias:  {type: Sequelize.STRING, allowNull: false},
                comment: Sequelize.STRING
                /*
                 TODO Set obliged foreign key
                 #created on 07.07.15
                 It's possible to create attribute without link to parental entity.
                 http://docs.sequelizejs.com/en/1.7.0/docs/associations/#foreign-keys
                 */
            });
            var meta_r = this.sequelize.define('_r', {
                name:    {type: Sequelize.STRING, allowNull: false},
                allias:  {type: Sequelize.STRING, allowNull: false},
                comment: Sequelize.STRING
            });
            var meta_a = this.sequelize.define('_a', {
                name:    {type: Sequelize.STRING, allowNull: false},
                allias:  {type: Sequelize.STRING, allowNull: false},
                type:    {type: Sequelize.STRING, allowNull: false},
                comment: Sequelize.STRING
            });
            meta_e.hasMany(meta_a, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
            meta_a.belongsTo(meta_e);
            meta_n.hasMany(meta_e, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
            meta_e.belongsTo(meta_n);
            meta_n.hasMany(meta_r, {onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
            meta_r.belongsTo(meta_n);

            console.log("Meta was created")
            // I suppose, here should be some check before...
            resolve('Ok.');

            // sync()
            // getMetaData
            // Compare to new JSON
            // addExtraRows to Meta
        })


    };
    this.createModel = function (request) {

        //return new Promise(function (resolve, reject) {

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
                        console.log(("Can't get type of attribute in " + JSON.stringify(result.type)))
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
        console.log("Model was created")
        //resolve('Ok!');
        //})

    };
    this.defineEntities = function (entities) {

        return new Promise(function (resolve, reject) {
            for (var i = 0; i < entities.length; i++) {
                console.log("Some text...")
                this.db_entities[i] = this.sequelize.define(entities[i].id, entities[i].attributes)
                if (i + 1 >= entities.length) {
                    console.log("resolved!")
                    resolve('Ok!');
                }
            }
            /* TODO analyze entities before defining
             * alliases
             * */
        })


    };
    this.synchronize = function () {
        console.log("Sync()...")
        this.sequelize.drop().then(function () {
            this.sequelize.sync();
        })


    };
    this.createDBEAR = function (params) {

        var request = require(params.demFile)

        this.setConnection(params)
        this.createModel(request)
        this.createMeta();
        this.defineEntities(this.model.namespaces[0].entities).then(function () {
            this.synchronize();
        });
    };
}

module['exports'] = Generator;