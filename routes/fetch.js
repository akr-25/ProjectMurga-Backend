const express = require('express')
const router = express.Router();

const db = require('../database/mysql');

const Sequelize = require('sequelize');
const { sequelize } = require('../models');
const {Request, User, Transaction } = require('../models');
const Op = Sequelize.Op;

router.get('/request' , async(req, res) => {
    Request.findAll()
    .then(gigs => console.log(gigs))
    .catch(e => console.log(e));

    res.end();
})

router.get('/transaction', async(req, res) =>{
    Transaction.findAll()
    .then()
})

module.exports = router;