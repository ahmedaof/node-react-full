const Category = require("../models/CategoryModel");
const {errorHandler} = require('../helpers/dbErrorHandler')

exports.create = (req,res)=>{
  const category = new Category(req.body)

  category.save((err,data)=>{
    if(err){
      return res.status(400).json({
        error: errorHandler(err)
      })
    }
     res.json({data})
  })
}

exports.categoryById = (req,res,next,id)=>{
  Category.findById(id).exec((err,category)=>{
    if(err || !category){
      return res.status(400).json({
        error: "category not exist"
      })
    }
    req.category = category;
    next()
  })
}

exports.showCategory = (req,res)=>{
   return res.json(req.category)
}

exports.update =(req,res)=>{
  let category = req.category ;
  category.name = req.body.name
  category.save((err,category)=>{
    if(err){
      return res.status(400).json({
        error: err
      })
    }
    res.json(category)
  })
}

exports.remove = (req,res)=>{
  let cat = req.category;
  cat.remove((err,deletedcat)=>{
    if(err){
      return res.status(400).json({
        error: errorHandler(err)
      })
    }
    res.json({deletedcat,"messaage": "category deleted"})
  })
}
exports.showAllCategory =(req,res)=>{
 Category.find().exec((err,data)=>{
   if(err){
     return res.status(400).json({
       error: errorHandler(err)
     })
   }
   res.json(data)
 })
}
