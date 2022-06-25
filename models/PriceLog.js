"use strict";
//* PriceLog model details
/*
  unit_id: primary_key
  price_per_unit: price of one animal of this unit
*/

const { Model } = require("sequelize");
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
        allowNull: false
      } 
    },
    {
      sequelize,
      tableName: "pricelogs",
      modelName: "PriceLog",
    }
  );
  return PriceLog;
};
