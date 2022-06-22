"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Transaction }) {
      // define association here
      this.belongsTo(User, { foreignKey: "applicant_id" });
      this.hasMany(Transaction, { foreignKey: "order_id" });
    }
  }
  Request.init(
    {
      request_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      applicant_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      order_status: DataTypes.STRING(50),
      type_of_unit: DataTypes.STRING(20),
      req_no_of_units: DataTypes.INTEGER,
      selling_price_per_unit: DataTypes.INTEGER, 
      order_type: DataTypes.STRING(10),
      price: DataTypes.INTEGER
    },
    {
      sequelize,
      tableName: "requests",
      modelName: "Request",
    }
  );
  return Request;
};
