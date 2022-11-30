const express = require('express')
require('dotenv').config();
const nodemailer = require('nodemailer');
const app = express()
const port = 3000
const cors = require('cors')
const bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.post("/send-mail", async(req, res) => {
  try{
    const { name, Mobile,email,subject,message } = req.body;
    const send_to = req.query.to;
    let transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    const mailOptions = {
      from: process.env.EMAIL_USERNAME, // Sender address
      to: `${send_to == 'rs' ? process.env.SEND_TO_RAJENDRA : process.env.SEND_TO_RAJAT}`, // List of recipients
      subject: subject, // Subject line
      text: `Hi my name is ${name} \nMobile number : ${Mobile} \nEmail : ${email} \n\n${subject}`, // Plain text body
    };
    
    transport.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err)
      } else {
        console.log(info);
      }
      return res.send({status:true,message:"Your Message has been received. You will be contacted shortly"})
    });
  }catch(e){
    console.log(e)
    return res.send({status:false,message:"Internal Server Error"})
  }
})

app.get('/',(req,res)=>{
  res.send("Application is working")
})

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`)
})