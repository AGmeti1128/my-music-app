const express=require('express');
const router=express.Router();
const musicController=require('../controllers/MusicController');
const auth=require('../Auth/Auth');
const {uploadImage,uploadMusic,cloudinary}=require('../utils/upload');

router.post('/uploadMusic',auth,uploadMusic.single('file'),musicController.uploadMusic);
router.get('/getAllMusic',auth,musicController.getAllMusic);
router.get('/searchMusic',auth,musicController.searchMusic);
module.exports=router;