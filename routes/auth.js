const express = require('express')
const router = express.Router()
const passport = require("passport")

// @desc Auth with google
// @route GET /auth/google

router.get('/google',passport.authenticate('google',{scope:['email','profile']}))

// @desc Google auth callback
// @route GET /auth/google/callback

router.get(
    '/google/callback',
    passport.authenticate('google',{
        successRedirect: '/protected',
        failureRedirect: '/'}),
    
)


module.exports=router;