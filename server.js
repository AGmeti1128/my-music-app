const express=require('express');
const app=express();

const path=require('path');
const cors=require('cors');
require('dotenv').config();
const mongoose=require('mongoose');
const userRouter=require('./routes/UserRouter');
const profileRouter=require('./routes/ProfileRouter');
const musicRouter=require('./routes/MusicRouter');
const cookieParser=require('cookie-parser');
app.use(cors(
    {origin:'http://localhost:4200',
     credentials:true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, "views")));
app.get("/",(req,res)=>{
    res.redirect("/api/v1/signin");
})
app.use('/api/v1',userRouter);
app.use('/api/v1',profileRouter);
app.use('/api/v1',musicRouter);

mongoose.connect(process.env.CONSTR,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((conn)=>{
    console.log('DB connection successfull');
})
app.listen(process.env.PORT,()=>{
    console.log('server started');
})
