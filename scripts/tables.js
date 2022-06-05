const { sequelize } = require("../models");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    await sequelize.sync({ force: true });
    console.log("Tables synced");
  } catch (err) {
    console.log(err);
  }
})();
