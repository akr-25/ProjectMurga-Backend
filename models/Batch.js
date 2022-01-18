const {Sequelize, DataTypes, Model} = require("sequelize");
const sequelize = require("../utils/connection"); 

class Batch extends Model {};

Batch.init({
    _id: {
        type: DataTypes.STRING,
        primaryKey: true, 
        allowNull: false
    },
},
    {
    sequelize, 
    modelName: 'Batch',
    tableName: 'Batches'
})

module.exports = Batch; 

