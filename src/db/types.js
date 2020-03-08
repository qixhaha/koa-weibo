/**
 * @description 封装sequelize
 * @author 綦旭
 */
const Sequelize = require('sequelize')
module.exports = {
    STRING:Sequelize.STRING,
    DECIMAL:Sequelize.DECIMAL,
    TEXT:Sequelize.TEXT,
    INTEGER:Sequelize.INTEGER,
    BOOLEAN:Sequelize.BOOLEAN
}