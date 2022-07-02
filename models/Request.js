"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    static associate({ User, Batch }) {
      this.belongsTo(User, { foreignKey: "applicant_id" });
      this.belongsTo(Batch, { foreignKey: "unit_id" });
    }
  }
  Request.init(
    {
      request_id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, 
      },
      applicant_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      unit_id: {
        type: DataTypes.STRING, 
        allowNull: false,
      }, 
      order_status: {
        type: DataTypes.STRING(50),
        allowNull: false, 
        validate: {
          is:["^[A-Za-z0-9 -]+$"]
        }
      },  
      type_of_unit: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          isAlpha: true
        }
      },
      req_no_of_units_type1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true, 
          min: 0
        }
      },
      req_no_of_units_type2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true, 
          min: 0
        }
      },
      selling_price_per_unit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true, 
          min: 0
        }
      }, 
      order_type: {
        type: DataTypes.STRING(10),
        defaultValue : "SELL", 
        allowNull: false, 
        validate : {
          isAlpha: true
        }
      },
    },
    {
      sequelize,
      tableName: "requests",
      modelName: "Request",
    }
  );
  return Request;
};
