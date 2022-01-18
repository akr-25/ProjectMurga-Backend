const dbConfig = require("../config/db.config.js");
const {Sequelize} = require("sequelize");

const sequelize =  new Sequelize(
    dbConfig.DB, dbConfig.USER, dbConfig.PW, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect
    }
)

module.exports = sequelize;
 
