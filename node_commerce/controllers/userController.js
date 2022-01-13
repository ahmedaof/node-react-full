const User = require('../models/UserModel');


exports.userById = (req ,res,next,id)=>{
  User.findById(id).exec((err,user)=>{
    if(err || !user){
      return res.status(400).json({
        error: "user not found"
      })
    }
    req.profile = user;
    next()
  })
};

exports.showUser =(req,res)=>{
 req.profile.hashed_password = undefined;
 req.profile.salt = undefined;
 return res.json(req.profile)

}

exports.updateUser =(req,res)=>{
User.findOneAndUpdate({_id: req.profile._id},{$set: req.body},{new: true},(err,user)=>{
  if(err || !user){
    return res.status(400).json({
      error: "not authorized"
    })
  }
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(user)
})
}
