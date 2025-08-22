const express=require('express');
const path=require('path');
const router=express.Router();
const userController=require('../controllers/UserController');
const auth=require('../Auth/Auth');
const upload=require('../utils/upload');

router.post('/signup',userController.signIn);
router.post('/login',userController.loggedIn);
router.get('/logout',userController.logout);
router.get('/music',auth,(req,res)=>{
    
    res.sendFile(path.join(__dirname,"views","main.html"));

})
router.get('/signin',(req,res)=>{
    
    res.sendFile(path.join(__dirname,"views","signup.html"));

})
router.get('/login',(req,res)=>{

    res.sendFile(path.join(__dirname,"views","login.html"));

})
module.exports=router;