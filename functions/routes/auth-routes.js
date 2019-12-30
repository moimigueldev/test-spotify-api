const router = require('express').Router();
const passport = require('passport');
const keys = require('../auth-config');


var SpotifyWebApi = require('spotify-web-api-node');


let scopes = ['user-top-read', 'user-read-recently-played']


var spotifyApi = new SpotifyWebApi({
    clientId: keys.spotify['client-id'],
    clientSecret: keys.spotify['client-secret'],
    redirectUri: encodeURIComponent(keys.spotify['redirect-url']),
  });

router.get('/login', (req, res)=> {
    const html = spotifyApi.createAuthorizeURL(scopes)
    console.log('login ', html)
    res.send({url: html})
})


router.get('/spotify/callback', passport.authenticate('spotify'), (req, res) => {
    console.log('ok');
    res.redirect('http://localhost:4200/dashboard')
  });



module.exports = router;