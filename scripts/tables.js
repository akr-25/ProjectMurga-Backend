const { sequelize } = require('../models');
require('dotenv').config();

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected');
        await sequelize.sync({ force: true });
        console.log("Tables synced");
    }
    catch (err) {
        console.log(err);
    }
})()