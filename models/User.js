'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Request }) {
      // define association here
      this.hasMany(Request, {foreignKey:'applicant_id'})
    }
  }
  User.init({
    user_id: {
      primaryKey:true, 
      type: DataTypes.STRING 
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    contact_no: DataTypes.STRING(10),
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    tableName: 'Users', 
    modelName: 'User',
  });
  return User;
};