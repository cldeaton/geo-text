/* eslint-disable prefer-const */
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');

const smsUrl = 'https://sms-service-46064.herokuapp.com/';

app.use(express.static(`${__dirname}/dist`));
app.use(bodyParser.json());

// landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/index.html`));
});

app.post('/sms', (req, res) => {
  let message = req.body.messageBody;
  let number = req.body.userNumber;
  let secret = process.env.USER_SECRET;
  console.log(`Message:${message}`);
  console.log(`Number:${number}`);
  console.log(`PW:${secret}`);
  let body = {
    messageBody: message,
    userNumber: number,
    userSecret: secret,
  };
  request.post(smsUrl, {
    body,
    json: true,
  }, (smsErr, smsResponse) => {
    console.log(`Errors:${smsErr}`);
    console.log(`Res:${smsResponse.statusMessage}`);
    res.status(smsResponse.statusCode);
    res.end();
  });
});

// listening Route
app.listen(process.env.PORT || 2200, () => {
  console.log('Server has started!!');
});
