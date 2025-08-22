const multer=require('multer');
const {CloudinaryStorage}=require('multer-storage-cloudinary');
const cloudinary=require('cloudinary').v2;
require('dotenv').config();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOLD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
const imageStorage=new CloudinaryStorage({
    cloudinary,
    params:async (req,file)=>({
      folder:'tweeter-app',
      allowed_formats:['jpg','png','jpeg'],
      public_id:Date.now() + '-' + file.originalname.split('.')[0]
    })
})
const musicStorage=new CloudinaryStorage({
  cloudinary,
  params:async (req,file)=>({
    folder:'music-app',
    resource_type:'video',
    format:'mp3',
    public_id:Date.now() + '-' + file.originalname.split('.')[0]
  })
})
const uploadImage=multer({storage:imageStorage});
const uploadMusic=multer({storage:musicStorage});
module.exports={uploadImage,uploadMusic,cloudinary};
