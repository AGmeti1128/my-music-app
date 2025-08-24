const { default: mongoose } = require("mongoose");

const messageSchema=new mongoose.Schema({
    message:String,
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model("Message", messageSchema);