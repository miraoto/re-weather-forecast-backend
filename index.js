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
  console.log(q);

  //const tempDiff = getTemperatureDifference();
  const tempDiff = 6;

  const data = {
    version: "1.0.0",
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: getMessage(tempDiff),
        ssml: '<speak>SSML text string to speak</speak>'
      }
    }
  };
  res.json(data);
}

function getTemperatureDifference() {
  let date = new Date();
  const today = date.getTime();
  const todayUrl = 'http://api.openweathermap.org/data/2.5/weather?id=1850147&type=hour' +
    `&appid=${process.env.API_KEY}`

  date.setDate(date.getDate() - 1);
  const yesterday = date.getTime();
  const yesterdayUrl = 'http://history.openweathermap.org/data/2.5/history/city?id=1850147&type=hour' +
    `&appid=${process.env.API_KEY}` +
    `&start=${today}` +
    `&end=${yesterday}`
  const response = syncRequest('GET', yesterdayUrl);
  const body = JSON.parse(response.getBody('utf8')) || {};

  console.log(todayUrl);
  console.log(yesterdayUrl);
}

function getMessage(tempDiff) {
  if (tempDiff >= 5 ) {
    return '今日は昨日よりもだいぶ暑いですね'
  }
  else if (tempDiff >= 2 ) {
    return '今日は昨日よりもちょっと暑いですね'
  }
  else if (tempDiff <= -2 ) {
    return '今日は昨日よりもちょっと寒いですね'
  }
  else if (tempDiff <= -5 ) {
    return '今日は昨日よりもだいぶ寒いですね'
  }
  else {
    return '昨日と同じぐらいですね'
  }
}
