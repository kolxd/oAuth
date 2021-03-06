const express = require('express');
const fetch = require('node-fetch');
const btoa = require('btoa');
// const catchAsync = require('../utils');

var token = '';
const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
// console.info(CLIENT_ID);
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const redirect = encodeURIComponent('http://localhost:3000/api/discord/callback');

router.get('/login', function(req, res) {
  res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`);
});

router.get('/callback', (async (req, res) => {
  // if (!req.query.code) throw new Error('NoCodeProvided');

  const code = req.query.code;
  const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${creds}`,
      },
    });
  const json = await response.json();
  console.log(json);
  res.redirect(`/?token=${json.access_token}`);
  token = json.access_token;
}));
module.exports = router;



// Client ID: 366591494775373825
// Client Secret: qgJy9tctCQvasEmf2il7-eOpL4dbWH4h
//
