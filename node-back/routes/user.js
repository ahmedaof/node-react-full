const express = require('express');
const router = express.Router()
const { userById,showUser,updateUser } = require("../controllers/userController");
const {requireSignin,isAuth,isAdmin} = require("../controllers/authController");

router.get("/secret/:userId", requireSignin, isAuth , (req,res)=>{
  res.json({
    user: req.profile
  })
})

router.get('/user/:userId',requireSignin, isAuth , showUser)
router.post('/user/:userId',requireSignin, isAuth , updateUser)

 router.param("userId",userById);



  module.exports = router;
