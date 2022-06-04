const express = require('express')
const { Request, User, FeedConsumptionLog, PriceLog ,Batch} = require('../models');
const { where } = require('sequelize');

module.exports = {
    addTransanction :async(req, res) => {
        // { transaction_id, order_id, unit_id, no_of_units, rate_per_unit}
        try {
            const request = await Request.findOne({where: req.body.order_id})
            const transaction = await request.createTransaction(req.body)
            res.end() 
        } 
        catch(err){
            console.log(err)
            return res.status(500).json(err) 
        }  
    },
    addUser: async (req, res) => {
        // { user_id, first_name, last_name, contact_no, email, password } = req.body;
        try {
            const user = await User.create(req.body); 
            // console.log(user) 
            return res.json(user);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
    addRequest :async (req, res) => {
        // const { user_id } = req.body;
        // const {applicant_id} = req.body;  
        try {
            const user = await User.findOne({where: {user_id : req.body.applicant_id}});
            const request = await user.createRequest(req.body); 
            res.end(); 
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
    addFeedConsumption : async (req, res) =>{
        //const {date, unit_id, rate, cost_per_gram} = req.body; 
    
        try {
            const batch = await Batch.findOne({where : {batch_id:req.body.unit_id}})
            const feedConsumption = await batch.createFeedConsumptionLog(req.body)
            return res.json(feedConsumption); 
        }
        catch(err){
            console.log(err)
            return res.status(500).json(err) 
        }
    },
    addPriceLog : async (req, res) =>{
        // const {date, unit_id, price_per_unit} = req.body; 
     
         try {
             const batch = await Batch.findOne({where : {batch_id:req.body.unit_id}})
             const priceLog = await batch.createPriceLog(req.body)
             return res.json(priceLog); 
         }
         catch(err){
             console.log(err)
             return res.status(500).json(err) 
         }
     },
     addBalanceLog : async (req, res) =>{
        // const {date, unit_id, net_balance_type1,net_balance_type2,type_of_change} = req.body; 
     
         try {
             const batch = await Batch.findOne({where : {batch_id:req.body.unit_id}})
             const balanceLog = await batch.createBalanceLog(req.body)
             return res.json(balanceLog); 
         }
         catch(err){
             console.log(err)
             return res.status(500).json(err) 
         }
     },
     addBatch : async (req, res) =>{
        // const {date, unit_id, net_balance_type1,net_balance_type2,type_of_change} = req.body; 
     
         try {
             const batch = await Batch.create(req.body)
            // const balanceLog = await batch.createBatch(req.body)
             return res.json(batch); 
         }
         catch(err){
             console.log(err)
             return res.status(500).json(err) 
         }
     }
}