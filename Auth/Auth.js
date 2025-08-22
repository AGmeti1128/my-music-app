const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
const User=require('../models/UserModel');
dotenv.config({path:'./config.env'});
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