"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BalanceLog extends Model {
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
  BalanceLog.init(
    {
      unit_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      net_balance_type1: DataTypes.INTEGER,
      net_balance_type2: DataTypes.INTEGER,
      type_of_change: DataTypes.STRING(50),
    },
    {
      sequelize,
      tableName: "balancelogs",
      modelName: "BalanceLog",
    }
  );
  return BalanceLog;
};
