const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/demo.config.json')[env];

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, config);
    // sequelize = new Sequelize(config.database, config.username, config.password, config);
}

module.exports = {
    sequelize
};