const express = require('express')
const router = express.Router();

const db = require('../database/mysql');

const Sequelize = require('sequelize');
const { sequelize } = require('../models');
const { Request, User } = require('../models');
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
    const { user_id, first_name, last_name, contact_no, email, password } = req.body;
    try {
        const user = await User.create({ user_id, first_name, last_name, contact_no, email, password })
        return res.json(user)
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }


})
router.post('/req', async (req, res) => {
    const { request_id, applicant_id, approval, type_of_unit, req_no_of_units, order_type } = req.body;
    try {
        const requ = await Request.create({ request_id, applicant_id, approval, type_of_unit, req_no_of_units, order_type })
        return res.json(requ)
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }


})
module.exports = router;