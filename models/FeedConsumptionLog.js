"use strict";
//*FeedConsumptionLog model details
/*
  unit_id : primary_key
  rate : total food given daily to a unit
  price_per_gram: food_price per gram
*/

const { Model } = require("sequelize");
const { FeedConsumptionLogLog } = require("./log");

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
    },
    {
      hooks: {
        afterCreate: (org, options) =>
          FeedConsumptionLogLog.createFromFeedConsumptionLog(org, "C"),
        afterUpdate: (org, options) =>
          FeedConsumptionLogLog.createFromFeedConsumptionLog(org, "U"),
        beforeDestroy: (org, options) =>
          FeedConsumptionLogLog.createFromFeedConsumptionLog(org, "D"),
        afterBulkCreate: (orgs, options) =>
          FeedConsumptionLogLog.bulkCreateFromFeedConsumptionLog(orgs, "C"),
        beforeBulkDestroy: (orgs, options) =>
          FeedConsumptionLogLog.bulkCreateFromFeedConsumptionLog(orgs, "D"),
        afterBulkUpdate: (orgs, options) =>
          FeedConsumptionLogLog.bulkCreateFromFeedConsumptionLog(orgs, "U"),
      },
      sequelize,
      tableName: "feedconsumptionlogs",
      modelName: "FeedConsumptionLog",
    }
  );
  return FeedConsumptionLog;
};
