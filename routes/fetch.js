const express = require('express')
const router = express.Router();

const db = require('../database/mysql');

const Sequelize = require('sequelize');
const { sequelize } = require('../models');
const {Request, User, Transaction, Batch, PriceLog} = require('../models');
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

router.get('/priceLogs', async(req, res) =>{
    //! untested code below, remove comment after testing

    const {start} = req.body; 

    try{
        const pricelogs = await PriceLog.findAll({
            model: PriceLog, 
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

router.get('/feedConsumptionLogs', async(req, res) =>{
    //! untested code below, remove comment after testing

    const {start} = req.body; 

    try{
        const pricelogs = await PriceLog.findAll({
            model: PriceLog, 
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

module.exports = router;