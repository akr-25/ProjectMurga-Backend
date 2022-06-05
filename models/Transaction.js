"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Request, Batch }) {
      // define association here
      this.belongsTo(Request, { foreignKey: "order_id" });
      this.belongsTo(Batch, { foreignKey: "unit_id" });
    }
  }
  Transaction.init(
    {
      transaction_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      order_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      unit_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      no_of_units: DataTypes.INTEGER,
      rate_per_unit: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "transactions",
      modelName: "Transaction",
    }
  );
  return Transaction;
};
