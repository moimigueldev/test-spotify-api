const router = require('express').Router();
const keys = require('../auth-config');

const request = require('request')
const rp = require('request-promise');
const userDB = require('./db-user');
const analyticsSearch = require('./collect-user-data')
const filterData = require('./filter-data');
const write = require('write');



const SpotifyWebApi = require('spotify-web-api-node');


const scopes = ['user-top-read', 'user-read-recently-played', 'user-follow-read', 'user-library-read']


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


let tracksOffset = 0;

router.post('/user', async (req, res) => {

  const options = {
    url: 'https://api.spotify.com/v1/me',
    headers: {
      'Authorization': `Bearer ${req.body.token}`
    }
  };


  // const userInfo = await rp(options)

  const userInfo = await rp(options)
    .then(res => JSON.parse(res))
    .catch(err => res.send(err))


   const currentUser = await userDB.searchDBForUser(userInfo, req.body.token)
   const userData = await analyticsSearch.userData(currentUser, req.body.token)
  //  const artistFollowing = await analyticsSearch.artistFollowing(currentUser.id, req.body.token)
  //  const playlist = await analyticsSearch.playlist(currentUser.id, req.body.token)
  //  const savedTracks = await analyticsSearch.savedtracks(tracksOffset, req.body.token)
  //  const getTopTracks = await analyticsSearch.getTopTracks(req.body.token)
  //  const getTopArtist = await analyticsSearch.getTopArtist(req.body.token)

  // res.send({ hello: artistFollowing })

  // TO BE ABLE TO TEST THE FILTER DATA FUNCTIONS, YOU MUST FIRST CREATE A DOCUMENT TO YOUR DIR WITH THIS CODE BELOW
  // ONCE THE FILE IS CREATED, PLEASE COMMENT IT OUT AGAIN.
  // FOR DEVELOPMENT USE A SMALLER LIST SIZE: 20
  //  write('tracks.json', JSON.stringify(savedTracks), { overwrite: true }).then(response => {
  //    res.send({hello: savedTracks})
  //  })

  


  // console.log('filter', filterData.tracksAddedThisMonth())

  res.send(userData)


})


router.get('/logout', (req, res) => {
  res.send('ok')
  // res.redirect('http://localhost:5000/angular-532f5/us-central1/app/auth/logout-server');
})




module.exports = router;