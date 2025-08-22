const mongoose=require('mongoose');
const ProfileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    surname:{
        type:String,
        required:[true,'surname is required']
    },
    profileUrl:{
        type:String
    },
    imagePublicId:{
        type:String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    }
    
})
const Profile=mongoose.model('Profile',ProfileSchema);
module.exports=Profile;