"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PriceLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Batch }) {
      // define association here
      this.belongsTo(Batch, { foreignKey: "unit_id" });
    }
  }
  PriceLog.init(
    {
      unit_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price_per_unit: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "pricelogs",
      modelName: "PriceLog",
    }
  );
  return PriceLog;
};
