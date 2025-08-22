const jwt=require('jsonwebtoken');
require('dotenv').config();
const User=require('../models/UserModel');
require('dotenv').config();
const auth=async (req,res,next)=>{
    
    
    
      try{
        const token=req.cookies.token;
        if(!token)
        return res.redirect("login");
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findOne({_id:decode.id})
        req.user=user;
        
        next();
      }
      catch(err)
      {
        return res.redirect("login");
      }
    
   

    

}
module.exports=auth;
