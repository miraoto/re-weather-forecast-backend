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
  res.send('今日は昨日より寒いです');
});

app.post('/', (req, res) => {
  res.send('今日は昨日より寒いです');
});
