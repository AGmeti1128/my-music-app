const express=require('express');
const router=express.Router();
const profileController=require('../controllers/ProfileController');
const auth=require('../Auth/Auth');
const {uploadImage,uploadMusic,cloudinary}=require('../utils/upload');
router.post('/updateProfile',auth,uploadImage.single('file'),profileController.updateProfile);
router.get('/profile',auth,profileController.getProfile);
router.get('/getUser',auth,profileController.getUser);
module.exports=router;