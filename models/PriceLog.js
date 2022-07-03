"use strict";
//* PriceLog model details
/*
  unit_id: primary_key
  price_per_unit: price of one animal of this unit
*/

const { Model } = require("sequelize");
const { PriceLogLog } = require("./log");

module.exports = (sequelize, DataTypes) => {
  class PriceLog extends Model {
    static associate({ Batch }) {
      this.belongsTo(Batch, { foreignKey: "unit_id" });
    }
  }
  PriceLog.init(
    {
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
      },
    },
    {
      hooks: {
        afterCreate: (org, options) => PriceLogLog.createFromPriceLog(org, "C"),
        afterUpdate: (org, options) => PriceLogLog.createFromPriceLog(org, "U"),
        beforeDestroy: (org, options) =>
          PriceLogLog.createFromPriceLog(org, "D"),
        // afterBulkCreate: (orgs, options) =>
        //   PriceLogLog.bulkCreateFromPriceLog(orgs, "C"),
        // beforeBulkDestroy: (orgs, options) =>
        //   PriceLogLog.bulkCreateFromPriceLog(orgs, "D"),
        // afterBulkUpdate: (orgs, options) =>
        //   PriceLogLog.bulkCreateFromPriceLog(orgs, "U"),
      },
      sequelize,
      tableName: "pricelogs",
      modelName: "PriceLog",
    }
  );
  return PriceLog;
};
