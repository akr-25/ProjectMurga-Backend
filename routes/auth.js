const express = require('express');
let router = express.Router();
const passport = require('passport');




router.get('/login', (req, res) => {
    console.log(req.baseUrl);
    res.render("login");
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'] 
}));


router.get('/google/callback', passport.authenticate( 'google', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));


router.post('/logout', (req, res) => {
    req.logOut();
    res.redirect("/auth/login");
});

module.exports = router;