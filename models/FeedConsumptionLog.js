const {Sequelize, DataTypes, Model} = require("sequelize");
const sequelize = require("../utils/connection"); 

class FeedConsumptionLog extends Model {};

FeedConsumptionLog.init({
    date: {
        type: DataTypes.DATE
    },
    feed_per_unit: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cost_per_gram: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
    sequelize, 
    modelName: 'FeedConsumptionLog',
    tableName: 'FeedConsumptionLogs'
})

module.exports = FeedConsumptionLog; 

