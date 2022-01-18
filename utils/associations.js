const Customer = require("../models/Customer");
const BalanceLog = require("../models/BalanceLog");
const Batch = require("../models/Batch");
const FeedConsumptionLog = require("../models/FeedConsumptionLog");
const Order = require("../models/Order");
const PriceLog = require("../models/PriceLog");
const Transactions = require("../models/Transactions"); 


const includeAssociations = () =>{
    // customer -> order
    Customer.hasMany(Order, {as: 'orders'});
    Order.belongsTo(Customer);
    // order -> transactions
    Order.hasMany(Transactions);
    Transactions.belongsTo(Order);
    // batch -> transactions 
    Batch.hasMany(Transactions);
    Transactions.belongsTo(Batch);
    // batch -> balancelogs
    Batch.hasMany(BalanceLog);
    BalanceLog.belongsTo(Batch);
    // batch -> pricelogs
    Batch.hasMany(FeedConsumptionLog);
    FeedConsumptionLog.belongsTo(Batch);
    // batch -> feedconsumptionlogs
    Batch.hasMany(PriceLog);
    PriceLog.belongsTo(Batch);
}
    
module.exports = includeAssociations; 

