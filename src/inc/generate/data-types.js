/**
 * Created by Victor on 24-Jul-15.
 */
var Sequelize = require('sequelize')


module.exports = {
    BINARY: Sequelize.STRING.BINARY,
    BOOLEAN: Sequelize.BOOLEAN,
    DATETIME: Sequelize.DATE,
    INTEGER: Sequelize.INTEGER,
    NUMERIC: Sequelize.DECIMAL,
    OPTION: Sequelize.ENUM,
    TEXT: Sequelize.STRING
}