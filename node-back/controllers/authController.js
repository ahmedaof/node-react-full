const User = require('../models/UserModel');
const {errorHandler} = require('../helpers/dbErrorHandler')
const jwt = require('jsonwebtoken');  // to generate signin jsonwebtoken
const expressJwt = require('express-jwt'); //for auth check

exports.signup = (req ,res)=>{
    console.log("req.body" , req.bod);
const user = new User(req.body);

user.save((err, user)=>{
    if(err){
        return res.status(400).json({
            err:errorHandler(err)
        })
    }
    user.salt = undefined ;
    user.hashed_password = undefined ;

    res.json({
        user
    })
})
};



exports.signin = (req ,res)=>{
// find the user according to Email

const{email , password} = req.body
User.findOne({email} , (err, user)=>{
  if(err || !user){
    return res.status(400).json({
      err:'this email not exist'
    });
  }

if(!user.authenticate(password)){
  return res.status(401).json({
    err:'email and password not match our credintials'
  })
}

  const token = jwt.sign({_id: user._id},process.env.JWT_SECRET)

  res.cookie('token', token , {expire: new Date()+9999})

  //return to front
  const {_id, name, email, role} = user;
  return res.json({token, user:{_id, email, name, role}})
})
};

exports.signout = (req,res)=>{

  res.clearCookie('token');
  res.json({
    message:"signout success"
  });

}


exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  userProperty: "auth"
})



exports.isAuth = (req,res,next)=>{
  let user = req.profile && req.auth && req.profile._id == req.auth._id
 if(!user){
   return res.status(403).json({
     error:"u don't have permission"
   })
 }
  next()
}


exports.isAdmin = (req,res,next)=>{
  if(req.profile.role === 0){
    return res.status(403).json({
      error: "access denied for admin only"
    })
  }
  next()
}
