"use strict";
//* BalanceLog Model Details -->
/*
  unit_id :  primary_key

  net_balance_type1 , net_balance_type2: this has different meanings according to context
      Case 1[Eggs (of any type)] : type1(TABLE) & type2(HATCHING)
      Case 2[Chicks/ (Ducklings)] -> type1(ALL) & type2(DEFAULTS TO 0)  [chicks/duckling don't have gender]
      Case 3[Growers] -> type1(MALE) & type2(FEMALE)
      Case 4[Layers] ->  SAME AS GROWERS
  
  type_of_change: 
      Initialization -> 
      Birth -> birth of new unit, (default value)
      Bought -> new units bought from external seller
      Death -> remove units 
      Sold -> units sold to buyer
      Converted to {batch_id} -> after a certain period of time some the following conversions may happen:
        --> eggs(hatching) -> chick/duckling
        --> chick/duckling -> growers(m/f)
        --> growers(m/f) -> layers(m/f) 

*/

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BalanceLogLog extends Model {
    static createFromBalanceLog(BalanceLog, action) {
      return this.create({
        unit_id: BalanceLog.unit_id,
        net_balance_type1: BalanceLog.net_balance_type1,
        net_balance_type2: BalanceLog.net_balance_type2,
        type_of_change: BalanceLog.type_of_change,
        action: action,
      });
    }
    static bulkCreateFromBalanceLog(BalanceLogs, action) {
      return this.bulkCreate(
        BalanceLogs.map((BalanceLog) => ({
          unit_id: BalanceLog.unit_id,
          net_balance_type1: BalanceLog.net_balance_type1,
          net_balance_type2: BalanceLog.net_balance_type2,
          type_of_change: BalanceLog.type_of_change,
          action: action,
        }))
      );
    }
  }
  BalanceLogLog.init(
    {
      log_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      unit_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      net_balance_type1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
          min: 1,
        },
      },
      net_balance_type2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
          min: 1,
        },
      },
      type_of_change: {
        type: DataTypes.STRING(50),
        defaultValue: "Birth",
        validate: {
          isAlpha: true,
        },
      },
      action: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "balancelogslogs",
      modelName: "BalanceLogLog",
    }
  );
  return BalanceLogLog;
};
