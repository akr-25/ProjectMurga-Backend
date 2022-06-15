"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FeedConsumptionLog extends Model {
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
  FeedConsumptionLog.init(
    {
      date:{
        type: DataTypes.DATE,
        allowNull: false
      },
      unit_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rate: DataTypes.INTEGER,
      cost_per_gram: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "feedconsumptionlogs",
      modelName: "FeedConsumptionLog",
    }
  );
  return FeedConsumptionLog;
};
