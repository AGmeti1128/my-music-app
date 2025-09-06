const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
const twilio=require('twilio');
const client=new twilio(
  process.env.TWILO_ACCOUNT_SID,
  process.env.TWILO_AUTH_TOKEN
)

async function sendSMS(message) {
     
   
    const sms=await client.messages.create({
        body:message,
        messagingServiceSid:process.env.TWILO_MESSAGE_SID,
        to:'+919916948452'
    })
}
module.exports={sendSMS};