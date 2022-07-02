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
module.exports = (sequelize, DataTypes) => {
  class BatchLog extends Model {
    static createFromBatch(Batch, action) {
      return this.create({
        batch_id: Batch.batch_id,
        is_active: Batch.is_active,
        action: action,
      });
    }
    static bulkCreateFromBatch(Batchs, action) {
      return this.bulkCreate(
        Batchs.map((BatchLog) => ({
          batch_id: Batch.batch_id,
          is_active: Batch.is_active,
          action: action,
        }))
      );
    }
  }
  BatchLog.init(
    {
      log_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      batch_id: {
        type: DataTypes.STRING,
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
      sequelize,
      tableName: "Batch_Log",
      modelName: "BatchLog",
    }
  );
  return BatchLog;
};
