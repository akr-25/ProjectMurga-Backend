"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserLog extends Model {
    static createFromUser(User, action) {
      return this.create({
        first_name: User.first_name,
        last_name: User.last_name,
        contact_no: User.contact_no,
        email: User.email,
        password: User.password,
        action: action,
      });
    }
    static bulkCreateFromUser(Users, action) {
      return this.bulkCreate(
        Users.map((User) => ({
          first_name: User.first_name,
          last_name: User.last_name,
          contact_no: User.contact_no,
          email: User.email,
          password: User.password,
          action: action,
        }))
      );
    }
  }
  UserLog.init(
    {
      log_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          len: [1, 100],
        },
      },
      last_name: {
        type: DataTypes.STRING,
        validate: {
          isAlpha: true,
          len: [1, 100],
        },
      },
      contact_no: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          isNumeric: true,
          len: [10, 10],
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        }, // emails are not necessary as of now
      },
      address: {
        type: DataTypes.STRING,
        validate: {
          isAlphanumeric: true,
        }, // emails are not necessary as of now
      },
      action: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "UserLogs",
      modelName: "UserLog",
    }
  );
  return UserLog;
};
