const express = require('express')
const router = express.Router();

const db = require('../database/mysql');

const { Request, User, FeedConsumptionLog, PriceLog ,Batch} = require('../models');
const { where } = require('sequelize');
const {addUser,addRequest,addBalanceLog,addFeedConsumption,addPriceLog,addBatch,addTransaction} = require('../controllers/addController.js')
const SchemaValidator = require('../middleware/SchemaValidator.js');
// const {userSchema} = require('../Validators/postSchema.js')
// const validateRequest = SchemaValidator(true);

router.post('/transaction', SchemaValidator('transaction_schema'),addTransaction)
router.post('/user',SchemaValidator('user_schema'), addUser)
router.post('/req', SchemaValidator('request_schema'),addRequest)
router.post('/feedConsumption',SchemaValidator('feedconsumption_schema'), addFeedConsumption)
router.post('/priceLog',SchemaValidator('pricelog_schema'),addPriceLog)
router.post('/balanceLogs',SchemaValidator('balancelog_schema'), addBalanceLog)
router.post('/createBatch', SchemaValidator('batch_schema'),addBatch)

module.exports = router;