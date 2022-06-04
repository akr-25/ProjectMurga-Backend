const express = require('express')
const router = express.Router();

const db = require('../database/mysql');

const Sequelize = require('sequelize');
const { sequelize } = require('../models');
const { Request, User, FeedConsumptionLog, PriceLog ,Batch} = require('../models');
const { where } = require('sequelize');
const Op = Sequelize.Op;


router.post('/user', async (req, res) => {
    // { user_id, first_name, last_name, contact_no, email, password } = req.body;
    try {
        const user = await User.create(req.body); 
        // console.log(user) 
        // return res.json(user);
        res.end()
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
})

router.post('/request', async (req, res) => {
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
})

router.post('/transaction', async(req, res) => {
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
})

router.post('/feedConsumption', async (req, res) =>{
    //const {date, unit_id, rate, cost_per_gram} = req.body; 

    try {
        const batch = await Batch.findOne({where : {batch_id: req.body.unit_id}})
        const feedConsumption = await batch.createFeedConsumptionLog(req.body)
        // return res.json(feedConsumption); 
        res.end()
    }
    catch(err){
        console.log(err)
        return res.status(500).json(err) 
    }
})

router.post('/priceLog', async (req, res) =>{
   // const {date, unit_id, price_per_unit} = req.body; 

    try {
        const batch = await Batch.findOne({where : {batch_id: req.body.unit_id}})
        const priceLog = await batch.createPriceLog(req.body)
        // return res.json(priceLog); 
        res.end() 
        //? frontend pe kuch send krna hota hai kya? 
    }
    catch(err){
        console.log(err)
        return res.status(500).json(err) 
    }
})

router.post('/balanceLogs', async (req, res) =>{
    // const {date, unit_id, net_balance_type1,net_balance_type2,type_of_change} = req.body; 
 
     try {
         const batch = await Batch.findOne({where : {batch_id:req.body.unit_id}})
         const balanceLog = await batch.createBalanceLog(req.body)
        //  return res.json(balanceLog); 
        res.end()
     }
     catch(err){
         console.log(err)
         return res.status(500).json(err) 
     }
 })

 router.post('/batch', async (req, res) =>{
    // const {batch_id} = req.body; 
 
     try {
         const batch = await Batch.create(req.body)
        //  return res.json(batch); 
        res.end(); 

     }
     catch(err){
         console.log(err)
         return res.status(500).json(err) 
     }
 })

module.exports = router;