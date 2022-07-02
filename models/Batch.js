"use strict";
//* Batch Model details
/*
  batch_id : primary key
  is_active : 
      -   is the current batch available for transactions? 
      -   a variable maintained by admin 
      -   **auto discontinue a batch when its balance [found in balance log model] becomes zero
          with permission from admin
      -   **auto discontinue a batch when it has to be converted into another
          with permission from admin
*/

const { Model } = require("sequelize");
const { BatchLog } = require("./log");

module.exports = (sequelize, DataTypes) => {
  class Batch extends Model {
    static associate({ Request, FeedConsumptionLog, PriceLog, BalanceLog }) {
      this.hasMany(Request, { foreignKey: "unit_id" });
      this.hasMany(FeedConsumptionLog, { foreignKey: "unit_id" });
      this.hasMany(PriceLog, { foreignKey: "unit_id" });
      this.hasMany(BalanceLog, { foreignKey: "unit_id" });
    }
  }
  Batch.init(
    {
      batch_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      is_active: {
        type: DataTypes.STRING(1),
        allowNull: false,
        defaultValue: "Y",
        validate: {
          isAlpha: true,
          len: [1, 1],
        },
      },
    },
    {
      hooks: {
        afterCreate: (org, options) => BatchLog.createFromBatch(org, "C"),
        afterUpdate: (org, options) => BatchLog.createFromBatch(org, "U"),
        beforeDestroy: (org, options) => BatchLog.createFromBatch(org, "D"),
        afterBulkCreate: (orgs, options) =>
          BatchLog.bulkCreateFromBatch(orgs, "C"),
        beforeBulkDestroy: (orgs, options) =>
          BatchLog.bulkCreateFromBatch(orgs, "D"),
        afterBulkUpdate: (orgs, options) =>
          BatchLog.bulkCreateFromBatch(orgs, "U"),
      },
      sequelize,
      tableName: "batches",
      modelName: "Batch",
    }
  );
  return Batch;
};
