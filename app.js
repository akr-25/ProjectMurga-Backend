const express = require("express"); 
const sequelize = require("./utils/connection");
const initAssociations = require("./utils/associations")
const app = express();
const port = 3000;

const Customer = require("./models/Customer");
const BalanceLog = require("./models/BalanceLog");
const Batch = require("./models/Batch");
const FeedConsumptionLog = require("./models/FeedConsumptionLog");
const Order = require("./models/Order");
const PriceLog = require("./models/PriceLog");
const Transactions = require("./models/Transactions"); 

sequelize.sync({force : true})
.then(initAssociations()).catch((err) => {console.log(err)}); 

app.listen(port, () =>{
    console.log("express app listening on localhost:3000"); 
})

