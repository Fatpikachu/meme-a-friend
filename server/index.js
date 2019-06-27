const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3008;
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//twilio
const twilio = require('twilio');
const { accountSid, authToken } = require('../src/config.js');
const client = new twilio(accountSid, authToken)



app.get('/send-text', async (req, res) => {
  const{ recipient, textMsg} = req.query;

  client.messages.create({
    body: textMsg,
    to: recipient,
    from: '14159410232'
  }). then((message)=> console.log('the message sent: ', message.body))

})

const server = app.listen(port, () => {
  console.log(`Starting the server at port ${port}`);
});

module.exports = app;