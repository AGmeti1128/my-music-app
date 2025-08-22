const mongoose=require('mongoose');
const musicSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Song Title is required']
    },
    movie:{
        type:String,
        required:[true,'Movie name is required']
    },
    url:{
        type:String
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
module.exports=mongoose.model('Music',musicSchema);