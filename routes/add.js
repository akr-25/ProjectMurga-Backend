const express = require('express')
const router = express.Router();

const db = require('../database/mysql');

const { Request, User, FeedConsumptionLog, PriceLog ,Batch} = require('../models');
const { where } = require('sequelize');
const {addUser,addRequest,addBalanceLog,addFeedConsumption,addPriceLog,addBatch,addTransanction} = require('../controllers/addController.js')
const Op = Sequelize.Op;

router.post('/transaction', addTransanction)
router.post('/user', addUser)
router.post('/req', addRequest)
router.post('/feedConsumption', addFeedConsumption)
router.post('/priceLog',addPriceLog)
router.post('/balanceLogs', addBalanceLog)
router.post('/createBatch', addBatch)

module.exports = router;