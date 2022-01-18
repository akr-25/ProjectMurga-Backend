const {Sequelize, DataTypes, Model} = require("sequelize");
const sequelize = require("../utils/connection"); 

class Customer extends Model {};

Customer.init({
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.TEXT,
},
    {
    sequelize, 
    modelName: 'Customer',
    tableName: 'Customers'
})

module.exports = Customer; 

