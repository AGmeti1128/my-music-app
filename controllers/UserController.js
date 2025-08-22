const User=require('../models/UserModel');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
const bcrypt=require('bcrypt');

const genearteToken=function(id,email){
   return jwt.sign({id:id,email:email},process.env.JWT_SECRET,{expiresIn:'1h'});
}
exports.logout = (req, res) => {
  
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict"
    });
    res.redirect('login');
  
  };
exports.signIn=async (req,res)=>{

    
    const user=await User.findOne({email:req.body.email});
    if(user)
     return res.status(400).json({
         status:'fail',
         message:'User is alreday exists please login'
     })

   try{

       const user=await User.create(req.body);
       const token=genearteToken(user._id,user.email);
       res.cookie('token',token,{
        httpOnly:true,
        secure:false,
        sameSite:'Lax',
        maxAge: 1*60*60*1000
    })
       res.status(200).json({
           status:'success',
           user:user,
           token
       })

   }
   catch(err)
   {
        res.status(404).json({
            status:'fail',
            message:err.message
        })
   }
  

}
exports.loggedIn=async (req,res)=>{
    
   const user=await User.findOne({email:req.body.email});
   if(!user)
    return  res.status(404).json({
         status:'fail',
         message:'User not exist please rigister to signin'
     })
     if(! (await user.comparePassword(req.body.password)))
     return res.status(401).json({
        status:'fail',
        message:'Incorrect password please enter correct password'
    })
     try{
        const token=genearteToken(user._id,user.email);
        res.cookie('token',token,{
            httpOnly:true,
            secure:false,
            sameSite:'Lax',
            maxAge: 1*60*60*1000
        })
        res.status(200).json({
            status:'success',
            user:user,
            token
        })
     }
     catch(err)
     {
         res.status(404).json({
             status:'fail',
             message:err.message
         })
     }
}