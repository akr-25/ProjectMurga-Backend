const {Sequelize, DataTypes, Model} = require("sequelize");
const sequelize = require("../utils/connection"); 

class Transaction extends Model {};

Transaction.init({
    _id: {
        type: DataTypes.STRING,
        primaryKey: true, 
        allowNull: false
    },
    no_of_units: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rate_per_unit: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
    sequelize, 
    modelName: 'Transaction',
    tableName: 'Transactions'
})

module.exports = Transaction; 
