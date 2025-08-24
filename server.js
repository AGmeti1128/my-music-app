const express=require('express');
const app=express();
const path=require('path');
const cors=require('cors');
require('dotenv').config();
const cookieParser=require('cookie-parser');
const { Server }=require('socket.io');
const mongoose=require('mongoose');
const http=require('http');
const userRouter=require('./routes/UserRouter');
const profileRouter=require('./routes/ProfileRouter');
const musicRouter=require('./routes/MusicRouter');
const messageRouter=require('./routes/MessageRouter');
const chatSocket=require('./Socket/chatSocket');
app.use(cors());
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
app.use('/api/v1',messageRouter);

mongoose.connect(process.env.CONSTR,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((conn)=>{
    console.log('DB connection successfull');
})

const server=http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

chatSocket(io);
server.listen(process.env.PORT,()=>{
    console.log('server started');
})
