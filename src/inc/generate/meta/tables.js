'use strict'
/* libraries */
var Sequelize = require('sequelize')

/**
 * Return Sequelize definition for META tables.
 * @param opts
 * @return {Tables}
 * @constructor
 */
function Tables(opts) {
    if (!(this instanceof  Tables)) return new Tables(opts)
    /* parse options */
    this.orm = opts.sequelize
    /* define META tables */
    this.database = _defineDatabase(this.orm)
    this.namespace = _defineNamespace(this.orm)
    this.entity = _defineEntity(this.orm)
    this.relation = _defineRelation(this.orm)
    this.attribute = _defineAttribute(this.orm)
    /* setup relation between META tables */
    this.entity.belongsTo(this.namespace, {foreignKey: 'namespace_id', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
    this.relation.belongsTo(this.namespace, {foreignKey: 'namespace_id', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});
    this.attribute.belongsTo(this.entity, {foreignKey: 'entity_id', onDelete: 'RESTRICT', onUpdate: 'RESTRICT'});

    return

    function _defineDatabase(orm) {
        var result = orm.define('database', {
                name: {
                    type:      Sequelize.TEXT,
                    comment:   "actual DEM as JSON",
                    allowNull: false,
                    unique:    false
                }
            }, {
                timestamps:      true,
                freezeTableName: true,
                tableName:       '_database'
            }
        )
        return result
    }

    /**
     * Define Sequelize model for 'namespace' table.
     *
     * @param orm Sequelize object
     * @return {Model}
     * @private
     */
    function _defineNamespace(orm) {
        var result = orm.define('namespace', {
                name:    {
                    type:      Sequelize.STRING,
                    comment:   "Namespace original name: 'com.flancer32.dbear'",
                    allowNull: false,
                    unique:    true
                },
                alias:   {
                    type:      Sequelize.STRING,
                    comment:   "Short name for the namespace: 'dbear'",
                    allowNull: false,
                    unique:    true
                },
                comment: {
                    type:    Sequelize.STRING,
                    comment: "Namespace description."
                }
            }, {
                timestamps:      false,
                freezeTableName: true,
                tableName:       '_namespace'
            }
        )
        return result
    }

    /**
     * Define Sequelize model for 'entity' table.
     *
     * @param orm Sequelize object
     * @return {Model}
     * @private
     */
    function _defineEntity(orm) {
        var result = orm.define('entity', {
                name:         {
                    type:      Sequelize.STRING,
                    comment:   "Entity name: 'Person'",
                    allowNull: false
                },
                namespace_id: {
                    type:      Sequelize.INTEGER,
                    comment:   "Link to the parent namespace",
                    allowNull: false
                },
                alias:        {
                    type:      Sequelize.STRING,
                    comment:   "Short name for the entity, is used in the table names: 'person'",
                    allowNull: false,
                    unique:    true
                },
                comment:      {
                    type:    Sequelize.STRING,
                    comment: "Entity description."
                }
            }, {
                timestamps:      false,
                freezeTableName: true,
                tableName:       '_entity',
                indexes:         [
                    {unique: true, fields: ['namespace_id', 'name']}
                ]
            }
        )
        return result
    }

    /**
     * Define Sequelize model for 'relation' table.
     *
     * @param orm Sequelize object
     * @return {Model}
     * @private
     */
    function _defineRelation(orm) {
        var result = orm.define('relation', {
                name:         {
                    type:      Sequelize.STRING,
                    comment:   "Relation name: 'PersonAuthMethod'",
                    allowNull: false
                },
                namespace_id: {
                    type:      Sequelize.INTEGER,
                    comment:   "Link to the parent namespace",
                    allowNull: false
                },
                alias:        {
                    type:      Sequelize.STRING,
                    comment:   "Short name for the relation, is used in the table names: 'pam'",
                    allowNull: false,
                    unique:    true
                },
                comment:      {
                    type:    Sequelize.STRING,
                    comment: "Relation description."
                }
            }, {
                timestamps:      false,
                freezeTableName: true,
                tableName:       '_relation',
                indexes:         [
                    {unique: true, fields: ['namespace_id', 'name']}
                ]
            }
        )
        return result
    }

    /**
     * Define Sequelize model for 'attribute' table.
     *
     * @param orm Sequelize object
     * @return {Model}
     * @private
     */
    function _defineAttribute(orm) {
        var result = orm.define('attribute', {
                name:      {
                    type:      Sequelize.STRING,
                    comment:   "Attribute name: 'FirstName'",
                    allowNull: false
                },
                entity_id: {
                    type:      Sequelize.INTEGER,
                    comment:   "Link to the parent entity",
                    allowNull: false
                },
                alias:     {
                    type:      Sequelize.STRING,
                    comment:   "Short name for the attribute, is used in the table names: 'pam'",
                    allowNull: false,
                    unique:    true
                },
                comment:   {
                    type:    Sequelize.STRING,
                    comment: "Attribute description."
                }
            }, {
                timestamps:      false,
                freezeTableName: true,
                tableName:       '_attribute',
                indexes:         [
                    {unique: true, fields: ['entity_id', 'name']}
                ]
            }
        )
        return result
    }

}

module.exports = Tables