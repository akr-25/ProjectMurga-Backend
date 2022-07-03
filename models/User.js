"use strict";
const { Model } = require("sequelize");
const { UserLog } = require("./log");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Request }) {
      // define association here
      this.hasMany(Request, { foreignKey: "applicant_id" });
    }
  }
  User.init(
    {
      user_id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          //  isAlpha: true,
          len: [1, 100],
        },
      },
      last_name: {
        type: DataTypes.STRING,
        validate: {
          //isAlpha: true,
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
    },
    {
      hooks: {
        afterCreate: (org, options) => UserLog.createFromUser(org, "C"),
        afterUpdate: (org, options) => UserLog.createFromUser(org, "U"),
        beforeDestroy: (org, options) => UserLog.createFromUser(org, "D"),
        // afterBulkCreate: (orgs, options) =>
        //   UserLog.bulkCreateFromUser(orgs, "C"),
        // beforeBulkDestroy: (orgs, options) =>
        //   UserLog.bulkCreateFromUser(orgs, "D"),
        // afterBulkUpdate: (orgs, options) =>
        //   UserLog.bulkCreateFromUser(orgs, "U"),
      },
      sequelize,
      tableName: "Users",
      modelName: "User",
    }
  );
  return User;
};
