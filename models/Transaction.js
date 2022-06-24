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
        type: DataTypes.STRING, //TODO: change datatype to UUID or some other random string, ask your uncle if it's okay
        primaryKey: true,
      },
      order_id: { //TODO: change datatype to UUID or some other random string, ask your uncle if it's okay
        type: DataTypes.STRING,
        allowNull: false,
      },
      unit_id: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      tableName: "transactions",
      modelName: "Transaction",
    }
  );
  return Transaction;
};
