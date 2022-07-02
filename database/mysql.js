const Sequelize = require("sequelize");

require("dotenv").config();

let sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    ssl: true,
    port: process.env.DB_PORT,
    logging: false,
  }
);

// let sequelizelog = new Sequelize(
//   process.env.DB_LOG_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST,
//     dialect: "mysql",
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//     ssl: true,
//     port: process.env.DB_LOG_PORT,
//     logging: false,
//   }
// );

module.exports = {
  sequelize
};
