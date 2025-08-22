const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,'User email is required'],
        unique:[true,'User account is alreday exists please login'],
        validate:[validator.isEmail,'Please enter valid email'],
        lowercase:true
    },
    password:{
        type:String,
        required:[true,'Please enter password'],
        minlength:[8,'Password shoud be minimum of 8 characters']
        
    },
    confirmPassword:{
        type:String,
        required:[true,'Please enter confirm password'],
       
        select:false
        
    },
    Profile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Profile'
    }
    
})
userSchema.pre('save',async function(next){
   
   
    if(!this.isModified('password'))
     return  next();
     if(!(this.password===this.confirmPassword))
     return next(new Error('password and confirm password does not macth'));
    try{
       this.password=await bcrypt.hash(this.password,10);
       this.confirmPassword=undefined;
       next();
    }
    catch(err)
    {
        next(new Error(err.message));
    } 
})

userSchema.methods.comparePassword=async function(password){
      return await bcrypt.compare(password,this.password);
}
const User=mongoose.model.User || mongoose.model('User',userSchema);

module.exports=User;