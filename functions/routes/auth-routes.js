const router = require('express').Router();
const keys = require('../auth-config');

const request = require('request')
const rp = require('request-promise');
const searchUserDb = require('./search-db-user');
const analyticsSearch = require('./collect-user-data')



const SpotifyWebApi = require('spotify-web-api-node');


const scopes = ['user-top-read', 'user-read-recently-played', 'user-follow-read']


const spotifyApi = new SpotifyWebApi({
  clientId: keys.spotify['client-id'],
  clientSecret: keys.spotify['client-secret'],
  redirectUri: encodeURIComponent(keys.spotify['redirect-url']),
});







router.get('/login', (req, res) => {
  let html = spotifyApi.createAuthorizeURL(scopes)
  html = html.replace('code', 'token');
  res.send({ url: html })
})



router.get('/spotify/callback', (req, res) => {
  res.redirect('http://localhost:4200/dashboard')
  // res.redirect('https://onsnip.com/dashboard')
});


router.post('/user', async (req, res) => {

  const options = {
    url: 'https://api.spotify.com/v1/me',
    headers: {
      'Authorization': `Bearer ${req.body.token}`
    }
  };
  
   
  const userInfo = await rp(options)
  

  
 const currentUser = await searchUserDb(JSON.parse(userInfo), req.body.token)
//  const artistFollowing = await analyticsSearch.artistFollowing(currentUser.id, req.body.token)
 const playlist = await analyticsSearch.playlist(currentUser.id, req.body.token)
  

  // console.log(req.body, 'adf')
  res.send(playlist)
  
})


router.get('/logout',  (req, res) => {
  res.send('ok')
  // res.redirect('http://localhost:5000/angular-532f5/us-central1/app/auth/logout-server');
})




module.exports = router;