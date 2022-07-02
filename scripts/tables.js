// FOR RUNNING THIS SCRIPT PLEASE CONFIRM THAT '.env' FILE WITH COMPLETE CONFIG IS
// AVAILABLE IN THE DATABASE DIRECTORY

const { sequelize } = require("../models");
const { sequelize: sequelizelog } = require("../models/log");

require("dotenv").config();

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    await sequelize.sync({ force: true });
    console.log("Tables synced");
    await sequelizelog.authenticate();
    console.log("Logging Database connected!");
    await sequelizelog.sync({ force: true });
    console.log("Synced!");
  } catch (err) {
    console.log(err);
  }
})();
