// models
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Organization.init(
    {
      company_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address:{
        type: DataTypes.STRING,
        allowNull: false
      },
      contact_no: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: "Organizations",
      modelName: "Organization",
    }
  );
  return Organization;
};
