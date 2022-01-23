const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest} = require('../middleware/auth')

// @Landing/Login page
// @route GET /

router.get('/',ensureGuest,(req,res)=>{
  res.render('login');
});


// @desc protected page
// @route GET /protected

router.get('/protected',ensureAuth,async (req,res)=>{
  try{
      // const user = await User.findOne({where :{email:req.user.email}});
      res.render('protected',{user: req.user});
  }catch(e){
      console.error(e);
      res.render('error/500')
  }
})

module.exports=router;