const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const crypto = require('crypto');
const cipher = crypto.createCipher('aes192', 'a password');

let smsUrl = 'https://sms-service-46064.herokuapp.com/';

app.use(express.static('dist'));
app.use(bodyParser.json());

// landing page
app.get("/", function(req, res){
  res.sendFile(path.join(__dirname + '/dist/index.html'));
})

app.post("/sms", function(req, res){
  let message = req.body.messageBody;
  let number = req.body.userNumber;
  let secret = req.body.userSecret;
  console.log("Message:" + message);
  console.log("Number:" + number);
  console.log("PW:" + secret);
  let body =  {
    messageBody: message,
    userNumber: number,
    userSecret: secret
  }
  res.send('OK');
  request.post(smsUrl, {
    body: body,
    json: true
  }, function(err, response, body){
    console.log("Errors:" + err);
    console.log("Res:" + response.statusMessage);
  })
 })

//listening Route
app.listen(process.env.PORT || 2200, function(){
    console.log("Server has started!!");
});
