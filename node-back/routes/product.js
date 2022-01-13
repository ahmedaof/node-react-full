const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { userById } = require("../controllers/userController");
const {create,productById,showProduct,remove,update,
  showAllProduct,relatedProduct,showAllCategory,listBySearch,photo} = require("../controllers/productController");
const {requireSignin,isAuth,isAdmin} = require("../controllers/authController");


router.post("/product/create/:userId",requireSignin,isAuth,isAdmin,create);
router.get("/product/:productId" , showProduct);
router.delete('/product/:productId/:userId' ,requireSignin,isAuth,isAdmin, remove )
router.put('/product/:productId/:userId' ,requireSignin,isAuth,isAdmin, update )
router.get("/products" , showAllProduct);
router.get("/products/related/:productId" , relatedProduct);
router.get("/products/categories" , showAllCategory);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId" ,photo)


   router.param("userId",userById);
   router.param("productId",productById);

  module.exports = router;
