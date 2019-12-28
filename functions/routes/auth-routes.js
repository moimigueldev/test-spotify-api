const router = require('express').Router();
const passport = require('passport');
const cors = require('cors');
const querystring = require('querystring')
const keys = require('../auth-config');


var SpotifyWebApi = require('spotify-web-api-node');


let scopes = ['user-top-read', 'user-read-recently-played']


var spotifyApi = new SpotifyWebApi({
    clientId: keys.spotify['client-id'],
    clientSecret: keys.spotify['client-secret'],
    redirectUri: 'http://localhost:5000/angular-532f5/us-central1/app/auth/spotify/callback',
  });

router.get('/login', (req, res)=> {
    const html = spotifyApi.createAuthorizeURL(scopes)
    res.send({html})
})


// router.get('/spotify/callback', (req, res) => {
//     console.log('ok');
//     res.send('reached call back uri')
//   });

router.get('/spotify/callback', passport.authenticate('spotify'), (req, res) => {
    console.log('ok');
    res.redirect('https://google.com')
  });

// router.get('/logout', (req, res) => {
//     res.send('loging out')
// })


module.exports = router;