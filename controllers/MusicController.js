const Music=require('../models/MusicModel');
const { sendSMS }=require('../controllers/smsService');

exports.uploadMusic=async (req,res)=>{
    try{
        const music=await Music.create({
            title:req.body.title,
            movie:req.body.movie,
            url:req.file.path,
            uploadedBy:req.user._id
        });
        res.status(200).json({
            status:'success',
            music
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
exports.getAllMusic=async (req,res)=>{
    try{
        const musicList=await Music.find().populate('uploadedBy','email');


        if(!musicList)
          return res.status(404).json({
              status:'fail',
              message:'no music found'
          })
          res.status(200).json({
            status:'success' ,
            musicList
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

exports.searchMusic=async (req, res) => {
    const { query } = req.query;
  
    try {
      const searchRegex = new RegExp(query, 'i'); // case-insensitive search
      const musicList = await Music.find({
        $or: [
          { title: searchRegex },
          { movie: searchRegex }
        ]
      }).sort({ createdAt: -1 });
  
      res.json({ musicList });
    } catch (err) {
      res.status(500).json({ status: 'fail', message: err.message });
    }
  }