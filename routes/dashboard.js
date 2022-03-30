const express = require('express');
let router = express.Router();
const authCheck = require('../middleware/checkAuth');


router.get("/", authCheck,  (req, res) => {
    res.render("dashboard", {name: req.user.first_name})
});



module.exports = router;