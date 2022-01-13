const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router()
const {signup ,signin,signout,requireSignin} = require("../controllers/authController");
router.post("/signup" ,  body('email','email format isn\'t correct').isEmail(),
body('name','name is required').notEmpty(),
  // password must be at least 5 chars long
  body('password','password must be more than 4').isLength({ min: 5 }),
  (req, res,next) => {
    const errors = validationResult(req);
    if (errors.array()[0]) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
  } ,signup);

 router.post("/signin", body('email','email format isn\'t correct').isEmail(),

   // password must be at least 5 chars long
   body('password','password must be more than 4').isLength({ min: 5 }),
   (req, res,next) => {
     const errors = validationResult(req);
     if (errors.array()[0]) {
       return res.status(400).json({ errors: errors.array() });
     }
     next()
   } ,signin);

 router.get("/signout",signout);

 router.get("/hello",requireSignin,(req,res)=> {
   res.send("hi");
 });


  module.exports = router;
