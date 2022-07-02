"use strict";
//*FeedConsumptionLog model details
/*
  unit_id : primary_key
  rate : total food given daily to a unit
  price_per_gram: food_price per gram
*/

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FeedConsumptionLog extends Model {
    static associate({ Batch }) {
      this.belongsTo(Batch, { foreignKey: "unit_id" });
    }
  }
  FeedConsumptionLog.init(
    {
      unit_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },  
      rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
          min: 1
        }
      },
      cost_per_gram: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        validate: {
          isNumeric: true, 
          min: 1
        }
      }
    },
    {
      sequelize,
      tableName: "feedconsumptionlogs",
      modelName: "FeedConsumptionLog",
    }
  );
  return FeedConsumptionLog;
};
