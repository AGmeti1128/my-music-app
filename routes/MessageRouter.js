const express=require('express');
const router=express.Router();
const auth=require('../Auth/Auth');
const messageController=require('../controllers/MessageController');
router.get('/chatHistory/:userId',auth,messageController.getMessages);

module.exports=router;