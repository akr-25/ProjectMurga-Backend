'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Batch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Transaction, FeedConsumptionLog, PriceLog, BalanceLog}) {
      // define association here
      this.hasMany(Transaction, {foreignKey: 'unit_id'});
      this.hasMany(FeedConsumptionLog, {foreignKey: 'unit_id'});
      this.hasMany(PriceLog, {foreignKey: 'unit_id'});
      this.hasMany(BalanceLog, {foreignKey: 'unit_id'})
    }
  }
  Batch.init({
    batch_id: {
      type:DataTypes.STRING,
      primaryKey:true
    }
  }, {
    sequelize,
    tableName: 'batches', 
    modelName: 'Batch',
  });
  return Batch;
};