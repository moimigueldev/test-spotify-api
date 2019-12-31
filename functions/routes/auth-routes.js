const router = require('express').Router();
const passport = require('passport');
const keys = require('../auth-config');


const SpotifyWebApi = require('spotify-web-api-node');


const scopes = ['user-top-read', 'user-read-recently-played']


const spotifyApi = new SpotifyWebApi({
    clientId: keys.spotify['client-id'],
    clientSecret: keys.spotify['client-secret'],
    redirectUri: encodeURIComponent(keys.spotify['redirect-url']),
  });

router.get('/login', (req, res)=> {
    const html = spotifyApi.createAuthorizeURL(scopes)
    res.send({url: html})
})


router.get('/spotify/callback', passport.authenticate('spotify'), (req, res) => {
    console.log('callback url hit', req.user);
    res.redirect('http://localhost:4200/dashboard')
  });



module.exports = router;