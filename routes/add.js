const express = require('express')
const router = express.Router();

const db = require('../database/mysql');

const Sequelize = require('sequelize');
const { sequelize } = require('../models');
const { Request, User, FeedConsumptionLog, PriceLog } = require('../models');
const { where } = require('sequelize');
const Op = Sequelize.Op;



router.get('/', (req, res) => {
    const data = {
        request_id: "1",
        applicant_id: "1",
        approval: "N",
        type_of_unit: "AA",
        req_no_of_units: 1,
        order_type: "D"

    }
    let { request_id,
        applicant_id,
        approval,
        type_of_unit,
        req_no_of_units,
        order_type
    } = data;
    const req1 = Request.create({
        request_id,
        applicant_id,
        approval,
        type_of_unit,
        req_no_of_units,
        order_type

    })
        .then(gig => res.redirect('/'))
        .catch(e => console.log(e));
});


router.post('/user', async (req, res) => {
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
})

router.post('/req', async (req, res) => {
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

router.post('/feedConsumption', async (req, res) =>{
    const {date, unit_id, rate, cost_per_gram} = req.body; 

    try {
        const feedConsumption = FeedConsumptionLog.create({date, unit_id, rate, cost_per_gram})
        return res.json(feedConsumption); 
    }
    catch(err){
        console.log(err)
        return res.status(500).json(err) 
    }
})

router.post('/priceLog', async (req, res) =>{
    const {date, unit_id, price_per_unit} = req.body; 

    try {
        const priceLog = PriceLog.create({date, unit_id, price_per_unit})
        return res.json(priceLog); 
    }
    catch(err){
        console.log(err)
        return res.status(500).json(err) 
    }
})


module.exports = router;