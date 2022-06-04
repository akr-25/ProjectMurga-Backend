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

router.get('/batch/:state' , async(req, res) => {
    const {state} = req.params; 

    try{
        const transaction  = await Batch.findAll({
            where: {is_active : state}, 
            include: Transaction
        })
        res.send(transaction)
    }
    catch(err){
        console.log(err)
        return res.status(500).json(err) 
    }
})

router.get('/batch/:id/transaction' , async(req, res) => {
    const {id} = req.params; 

    // console.log(id); 

    try{    
        const transaction  = await Batch.findOne({
            where: {batch_id : id}, 
            include: Transaction
        })
        res.send(transaction)
    }
    catch(err){
        console.log(err)
        return res.status(500).json(err) 
    }
})

router.get('/request/:id/transaction' , async(req, res) => {
    const {id} = req.params; 

    try{
        const transaction  = await Request.findOne({
            where: {request_id : id}, 
            include: Transaction
        })
        res.send(transaction)
    }
    catch(err){
        console.log(err)
        return res.status(500).json(err) 
    }
})


router.get('/priceLog/:date', async(req, res) =>{
    //! remove comment after testing integration with frontend
    
    // send the start date from frontend with proper type
    // expects --> http://localhost:3001/fetch/priceLog/date?start="04-05-2022"&end="06-05-2022"


    const { start, end } = req.query


    try{
        const pricelogs = await PriceLog.findAll({
            where: {
                date : {
                    [Op.and] : [{[Op.gte] : Date.parse(start)}, {[Op.lte] : Date.parse(end)}]
                    
                    // all pricelogs such that [end >= pricelogs.date >= start]  
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


router.get('/feedConsumptionLog/:date', async(req, res) =>{
    //! remove comment after testing integration with frontend
    
    // send the start date from frontend with proper type
    // expects --> http://localhost:3001/fetch/feedConsumptionLog/date?start="04-05-2022"&end="06-05-2022"


    const { start, end } = req.query

    try{
        const feedlogs = await FeedConsumptionLog.findAll({ 
            where: {
                date : {
                    [Op.and] : [{[Op.gte] : Date.parse(start)}, {[Op.lte] : Date.parse(end)}] 
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

router.get('/balanceLog/:date', async(req, res) =>{
    //! remove comment after testing integration with frontend
    
    // send the start date from frontend with proper type
    // expects --> http://localhost:3001/fetch/balanceLog/date?start="04-05-2022"&end="06-05-2022"


    const { start, end } = req.query

    try{
        const balancelogs = await BalanceLog.findAll({ 
            where: {
                date : {
                    [Op.and] : [{[Op.gte] : Date.parse(start)}, {[Op.lte] : Date.parse(end)}]
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