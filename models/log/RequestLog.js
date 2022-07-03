"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RequestLog extends Model {
    static createFromRequest(Request, action) {
      return this.create({
        applicant_id: Request.applicant_id,
        unit_id: Request.unit_id,
        order_status: Request.order_status,
        type_of_unit: Request.type_of_unit,
        req_no_of_units_type1: Request.req_no_of_units_type1,
        req_no_of_units_type2: Request.req_no_of_units_type2,
        selling_price_per_unit: Request.selling_price_per_unit,
        order_type: Request.order_type,
        action: action,
      });
    }
    static bulkCreateFromRequest(Requests, action) {
      return this.bulkCreate(
        Requests.map((Request) => ({
          applicant_id: Request.applicant_id,
          unit_id: Request.unit_id,
          order_status: Request.order_status,
          type_of_unit: Request.type_of_unit,
          req_no_of_units_type1: Request.req_no_of_units_type1,
          req_no_of_units_type2: Request.req_no_of_units_type2,
          selling_price_per_unit: Request.selling_price_per_unit,
          order_type: Request.order_type,
          action: action,
        }))
      );
    }
  }
  RequestLog.init(
    {
      log_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      RequestLog_id: {
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
      },
      type_of_unit: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          isAlpha: true,
        },
      },
      req_no_of_units_type1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
          min: 0,
        },
      },
      req_no_of_units_type2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
          min: 0,
        },
      },
      selling_price_per_unit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
          min: 0,
        },
      },
      order_type: {
        type: DataTypes.STRING(10),
        defaultValue: "SELL",
        allowNull: false,
        validate: {
          isAlpha: true,
        },
        action: {
          type: DataTypes.STRING(1),
          allowNull: false,
        },
      },
    },
    {
      sequelize,
      tableName: "RequestLogs",
      modelName: "RequestLog",
    }
  );
  return RequestLog;
};
