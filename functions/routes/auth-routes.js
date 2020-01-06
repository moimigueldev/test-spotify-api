const router = require('express').Router();
const keys = require('../auth-config');
const rp = require('request-promise');
const userDB = require('./db-user');
const analyticsSearch = require('./collect-user-data')
const cache = require('./cache-routes')
const SpotifyWebApi = require('spotify-web-api-node');
var mcache = require('memory-cache');


const scopes = keys.spotify['scopes'];



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
  res.redirect(keys.routes['redirect-url'])
});

router.post('/loginUser', async (req, res) => {

  const options = {
    url: 'https://api.spotify.com/v1/me',
    headers: {
      'Authorization': `Bearer ${req.body.token}`
    }
  };

  const userInfo = await rp(options)
    .then(res => JSON.parse(res))
    // .catch(err => console.log('err', err))


  const currentUser = await userDB.searchDBForUser(userInfo, req.body.token)
  const userData = await analyticsSearch.userData(currentUser, req.body.token)

 

  userDB.saveUserData(userData, req.body.token).then(response => {
    res.send(currentUser)
  })
    // .catch(err => console.log('Error Saving User to the db', err))




})//end of login in user

router.post('/user', async (req, res) => {

  const options = {
    url: 'https://api.spotify.com/v1/me',
    headers: {
      'Authorization': `Bearer ${req.body.token}`
    }
  };

  const userInfo = await rp(options)
    .then(res => JSON.parse(res))
    .catch(err => res.send(err))


  const currentUser = await userDB.searchDBForUser(userInfo, req.body.token)
  const userData = await analyticsSearch.userData(currentUser, req.body.token)


  userDB.saveUserData(userData, req.body.token).then(response => {
    res.send(userData)
  })
    // .catch(err => console.log('Error Saving User to the db', err))

  // TO BE ABLE TO TEST THE FILTER DATA FUNCTIONS, YOU MUST FIRST CREATE A DOCUMENT TO YOUR DIR WITH THIS CODE BELOW
  // ONCE THE FILE IS CREATED, PLEASE COMMENT IT OUT AGAIN.
  // FOR DEVELOPMENT USE A SMALLER LIST SIZE: 20
  //  write('tracks.json', JSON.stringify(savedTracks), { overwrite: true }).then(response => {
  //    res.send({hello: savedTracks})
  //  })

})


// Cache is setting for 16 min (MAX)
router.post('/savedUser', cache(960000), (req, res) => {
  const cookie = req.body.cookie

  userDB.getSavedUserData(cookie).then(response => {
    res.send(response)
  })

  



})


router.get('/logout', (req, res) => {
  if(mcache.keys().length) {
    mcache.clear();
  }
  res.send('200')
})






module.exports = router;