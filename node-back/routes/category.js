const express = require('express');
const { userById } = require("../controllers/userController");
const { body, validationResult } = require('express-validator');
const router = express.Router()
const {create,categoryById,showCategory,update,remove,showAllCategory} = require("../controllers/categoryController");
const {requireSignin,isAuth,isAdmin} = require("../controllers/authController");

router.post("/category/create/:userId" ,requireSignin,isAuth,isAdmin,
body('name','name is required').notEmpty(),
  // password must be at least 5 chars long
  (req, res,next) => {
    const errors = validationResult(req);
    if (errors.array()[0]) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
  } ,create);

router.put("/category/:categoryId/:userId" ,requireSignin,isAuth,isAdmin ,update);
router.delete("/category/:categoryId/:userId" ,requireSignin,isAuth,isAdmin ,remove);
router.get('/category/:categoryId' , showCategory)
 router.param("userId",userById);
 router.param("categoryId",categoryById);
router.get('/categories' , showAllCategory)

  module.exports = router;
