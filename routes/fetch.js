const express = require('express')
const router = express.Router();

const db = require('../database/mysql');

const Sequelize = require('sequelize');
const { sequelize } = require('../models');
const {Request, User, Transaction, Batch, PriceLog, FeedConsumptionLog, BalanceLog } = require('../models');
const Op = Sequelize.Op;

router.get('/request' , async(req, res) => {
    const {user_id} = req.body; 

    try{
        const request  = await User.findOne({
            where: {user_id : user_id}, 
            include: Request
        })
        res.send(request)
    }
    catch(err){
        console.log(err)
        return res.status(500).json(err) 
    }
})

router.get('/batch/transaction' , async(req, res) => {
    const {batch_id} = req.body; 

    try{
        const transaction  = await Batch.findOne({
            where: {batch_id : batch_id}, 
            include: Transaction
        })
        res.send(transaction)
    }
    catch(err){
        console.log(err)
        return res.status(500).json(err) 
    }
})

router.get('/request/transaction' , async(req, res) => {
    const {request_id} = req.body; 

    try{
        const transaction  = await Request.findOne({
            where: {request_id : request_id}, 
            include: Transaction
        })
        res.send(transaction)
    }
    catch(err){
        console.log(err)
        return res.status(500).json(err) 
    }
})


router.get('/priceLog', async(req, res) =>{
    //! remove comment after testing integration with frontend
    
    // send the start date from frontend with proper type

    const {start} = req.body; 

    try{
        const pricelogs = await PriceLog.findAll({
            where: {
                date : {
                    [Op.gte] : start 
                    // all pricelogs such that pricelogs.date >= start
                } 
            }
        })

        res.send(pricelogs)
    }
    catch(err){
        console.log(err)
        return res.status(500).json(err) 
    }
})


router.get('/feedConsumptionLog', async(req, res) =>{
    //! remove comment after testing integration with frontend
    
    // send the start date from frontend with proper type

    const {start} = req.body; 

    try{
        const feedlogs = await FeedConsumptionLog.findAll({ 
            where: {
                date : {
                    [Op.gte] : start 
                    // all pricelogs such that pricelogs.date >= start
                } 
            }
        })

        res.send(feedlogs)
    }
    catch(err){
        console.log(err)
        return res.status(500).json(err) 
    }
})

router.get('/balanceLog', async(req, res) =>{
    //! remove comment after testing integration with frontend
    
    // send the start date from frontend with proper type

    const {start} = req.body; 

    try{
        const balancelogs = await BalanceLog.findAll({ 
            where: {
                date : {
                    [Op.gte] : start 
                    // all pricelogs such that pricelogs.date >= start
                } 
            }
        })

        res.send(balancelogs)
    }
    catch(err){
        console.log(err)
        return res.status(500).json(err) 
    }
})


module.exports = router;