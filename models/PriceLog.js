const {Sequelize, DataTypes, Model} = require("sequelize");
const sequelize = require("../utils/connection"); 

class PriceLog extends Model {};

PriceLog.init({
    date: {
        type: DataTypes.DATE
    },
    rate_per_unit: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
    sequelize, 
    modelName: 'PriceLog',
    tableName: 'PriceLogs'
})

module.exports = PriceLog; 


