const {Sequelize, DataTypes, Model} = require("sequelize");
const sequelize = require("../utils/connection"); 

class BalanceLog extends Model {};

BalanceLog.init({
    date: {
        type: DataTypes.DATE
    },
    net_balance_type1: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    net_balance_type2: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    type_of_change: {
        type: DataTypes.STRING(1), 
        allowNull: false
    }
},
    {
    sequelize, 
    modelName: 'BalanceLog',
    tableName: 'BalanceLogs'
})

module.exports = BalanceLog; 
