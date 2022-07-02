"use strict";
//*FeedConsumptionLogLog model details
/*
  unit_id : primary_key
  rate : total food given daily to a unit
  price_per_gram: food_price per gram
*/

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FeedConsumptionLogLog extends Model {
    static createFromFeedConsumptionLog(FeedConsumptionLog, action) {
      return this.create({
        unit_id: FeedConsumptionLog.unit_id,
        rate: FeedConsumptionLog.rate,
        cost_per_gram: FeedConsumptionLog.cost_per_gram,
        action: action,
      });
    }
    static bulkCreateFromFeedConsumptionLog(FeedConsumptionLogs, action) {
      return this.bulkCreate(
        FeedConsumptionLogs.map((FeedConsumptionLog) => ({
          unit_id: FeedConsumptionLog.unit_id,
          rate: FeedConsumptionLog.rate,
          cost_per_gram: FeedConsumptionLog.cost_per_gram,
          action: action,
        }))
      );
    }
  }
  FeedConsumptionLogLog.init(
    {
      log_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      unit_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
          min: 0,
        },
      },
      cost_per_gram: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
          min: 0,
        },
      },
      action: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "FeedConsumptionLogLogs",
      modelName: "FeedConsumptionLogLog",
    }
  );
  return FeedConsumptionLogLog;
};
