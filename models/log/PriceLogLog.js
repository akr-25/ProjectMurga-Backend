"use strict";
//* PriceLogLog model details
/*
  unit_id: primary_key
  price_per_unit: price of one animal of this unit
*/

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PriceLogLog extends Model {
    static createFromPriceLog(PriceLog, action) {
      return this.create({
        unit_id: PriceLog.unit_id,
        price_per_unit: PriceLog.price_per_unit,
        action: action,
      });
    }
    static bulkCreateFromPriceLog(PriceLogs, action) {
      return this.bulkCreate(
        PriceLogs.map((PriceLog) => ({
          unit_id: PriceLog.unit_id,
          price_per_unit: PriceLog.price_per_unit,
          action: action,
        }))
      );
    }
  }
  PriceLogLog.init(
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
      price_per_unit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
        },
        action: {
          type: DataTypes.STRING(1),
          allowNull: false,
        },
      },
    },
    {
      sequelize,
      tableName: "PriceLogLogs",
      modelName: "PriceLogLog",
    }
  );
  return PriceLogLog;
};
