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

const trialCase = async () =>{
    await initAssociations();
    const customer = await Customer.create({_id: 1, firstName: "eeshaan", lastName:"dutta", phoneNumber: "9132726092", address: "Murhateteli, Usha Apartment, Tezpur"});
    const order = await Order.create({_id:1, approval: "Y", type_of_unit: "CC", req_no_of_units:10, order_type: "S"});
    customer.setOrders(order); 
    const transaction = await Transactions.create({_id:1, rate_per_unit: 20, no_of_units: 10}); 
    order.setTransactions(transaction);  
    const batch = await Batch.create({_id:"CC-001"})
    batch.setTransactions(transaction); 
}

trialCase().then().catch(e => {console.log(e)}); 

app.listen(port, () =>{
    console.log("express app listening on localhost:3000"); 
})

