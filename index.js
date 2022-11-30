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
    console.log(transport)
    const mailOptions = {
      from: 'sender@gmail.com', // Sender address
      to: 'rajat.kumar2771@gmail.com', // List of recipients
      subject: 'Node Mailer', // Subject line
      text: 'Hello People!, Welcome to Bacancy!', // Plain text body
    };
    
    console.log("2")
    transport.sendMail(mailOptions, function (err, info) {
      console.log("3")
      if (err) {
        console.log(err)
      } else {
        console.log(info);
      }
      console.log("4")
      return res.send("true")
    });
    console.log("5")
  }catch(e){
    console.log(e)
  }
})

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`)
})