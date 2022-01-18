const {Sequelize, DataTypes, Model} = require("sequelize");
const sequelize = require("../utils/connection"); 

class Order extends Model {};

Order.init({
    _id: {
        type: DataTypes.STRING,
        primaryKey: true, 
        allowNull: false
    },
    approval: {
        type: DataTypes.STRING(1),
        allowNull: false
    },
    type_of_unit: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    req_no_of_units: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    order_type: {
        type: DataTypes.STRING(1),
        allowNull:false
    }
},
    {
    sequelize, 
    modelName: 'Order',
    tableName: 'Orders'
})

module.exports = Order; 
