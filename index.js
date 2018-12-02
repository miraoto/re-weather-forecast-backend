'use strict';

const request = require('request');
const syncRequest = require('sync-request');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

// for debug
app.get('/', (req, res) => {
  handleQueries(req.body, res);
});

app.post('/', (req, res) => {
  handleQueries(req.body, res);
});


function handleQueries(q, res) {
  const data = {
    version: "1.0.0",
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: '今日は昨日よりも寒いです',
        ssml: '<speak>SSML text string to speak</speak>'
      }
    }
  };
  res.json(data);
}
