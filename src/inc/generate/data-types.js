/**
 * Created by Victor on 24-Jul-15.
 */
var Sequelize = require('sequelize')


module.export = {
    BINARY: Sequelize.STRING.BINARY,
    BOOLEAN: Sequelize.BOOLEAN,
    DATETIME: Sequelize.DATE,
    INTEGER: Sequelize.INTEGER,
    //NUMERIC : ,
    //OPTION : ,
    TEXT: Sequelize.STRING
}