const express = require('express')
const router = express.Router();

const db = require('../database/mysql');

const Sequelize = require('sequelize');
const { sequelize } = require('../models');
const {Request, User, Transaction } = require('../models');
const Op = Sequelize.Op;

router.get('/request' , async(req, res) => {
    try{
        const request  = await Request.findAll()
        res.send(request)
    }
    catch(err){
        console.log(err)
        return res.status(500).json(err) 
    }
})

router.get('/transaction', async(req, res) =>{
    Transaction.findAll()
    .then()
})

module.exports = router;