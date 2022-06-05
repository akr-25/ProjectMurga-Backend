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
        return res.send({error: null, message: "success", data:{user}}); 
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({error: err, message: "failure", data:null}); 
    }
})

router.post('/request', async (req, res) => {
    // const { user_id } = req.body;
    // const {applicant_id} = req.body;  
    try {
        const user = await User.findOne({where: {user_id : req.body.applicant_id}});
        const request = await user.createRequest(req.body); 
        return res.send({error: null, message: "success", data:{request}});  
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({error: err, message: "failure", data:null});
    }
})

router.post('/transaction', async(req, res) => {
    // { transaction_id, order_id, unit_id, no_of_units, rate_per_unit}
    try {
        const request = await Request.findOne({where: req.body.order_id})
        const transaction = await request.createTransaction(req.body)
        return res.send({error: null, message: "success", data:{transaction}}); 
    } 
    catch(err){
        console.log(err)
        return res.status(500).send({error: err, message: "failure", data:null});
    }  
})

router.post('/feedConsumptionLog', async (req, res) =>{
    //const {date, unit_id, rate, cost_per_gram} = req.body; 

    //TODO -- we should not be able to insert into inactive batches, i'll write code after controllers are merged

    try {
        const batch = await Batch.findOne({where : {batch_id: req.body.unit_id}})
        const feedConsumption = await batch.createFeedConsumptionLog(req.body)
        return res.send({error: null, message: "success", data:{feedConsumption}}); 
    }
    catch(err){
        console.log(err)
        return res.status(500).send({error: err, message: "failure", data:null});
    }
})

router.post('/priceLog', async (req, res) =>{
   // const {date, unit_id, price_per_unit} = req.body; 

    //TODO -- we should not be able to insert into inactive batches, i'll write code after controllers are merged

    //? C-001 --> C-002 ? 

    try {
        const batch = await Batch.findOne({where : {batch_id: req.body.unit_id}})
        const priceLog = await batch.createPriceLog(req.body)
        return res.send({error: null, message: "success", data:{priceLog}}); 
    }
    catch(err){
        console.log(err)
        return res.status(500).send({error: err, message: "failure", data:null});
    }
})

router.post('/balanceLog', async (req, res) =>{
    // const {date, unit_id, net_balance_type1,net_balance_type2,type_of_change} = req.body; 
    
    //TODO -- we should not be able to insert into inactive batches, i'll write code after controllers are merged

     try {
         const batch = await Batch.findOne({where : {batch_id:req.body.unit_id}})
         const balanceLog = await batch.createBalanceLog(req.body)
         return res.send({error: null, message: "success", data:{balanceLog}}); 
     }
     catch(err){
         console.log(err)
         return res.status(500).send({error: err, message: "failure", data:null});
     }
 })

 router.post('/batch', async (req, res) =>{
    // const { batch_id, is_active } = req.body; 
    
    //TODO -- update batch model add default to is_active

     try {
         const batch = await Batch.create(req.body)
        return res.send({error: null, message: "success", data:{batch}}); 

     }
     catch(err){
         console.log(err)
         return res.status(500).send({error: err, message: "failure", data: null}); 
     }
 })

module.exports = router;