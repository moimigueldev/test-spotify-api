const router = require('express').Router();
const passport = require('passport');
const keys = require('../auth-config');

const request = require('request')



const SpotifyWebApi = require('spotify-web-api-node');


const scopes = ['user-top-read', 'user-read-recently-played']


const spotifyApi = new SpotifyWebApi({
  clientId: keys.spotify['client-id'],
  clientSecret: keys.spotify['client-secret'],
  redirectUri: encodeURIComponent(keys.spotify['redirect-url']),
});


const admin = require('firebase-admin');
const serviceAccountKey = require('.././ServiceAccountKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
});

const db = admin.firestore();



router.get('/login', (req, res) => {
  let html = spotifyApi.createAuthorizeURL(scopes)
  html = html.replace('code', 'token');
  res.send({ url: html })
})



router.get('/spotify/callback', (req, res) => {


  // res.redirect('http://localhost:4200/dashboard')
  res.redirect('https://onsnip.com/dashboard')
});


router.post('/user', (req, res) => {

  var options = {
    url: 'https://api.spotify.com/v1/me',
    headers: {
      'Authorization': `Bearer ${req.body.token}`
    }
  };
   
  
   
  request(options, async (err, body, response) => {
    const profile = JSON.parse(response)
    const user = await db.collection('spotify-users').doc(profile.id).get();

            if (!user.data()) { //does not exist yet
                console.log('creating new user');
                const newUser = {
                    id: profile.id,
                    dateUpdated: new Date(),
                    displayName: profile.displayName,
                    followers: profile.followers,
                    accessToken: accessToken
                };


                db.collection('spotify-users').doc(profile.id).set(newUser).then((user) => {
                    // console.log('new User Created', user.data().id)
                    // done(null, user.data())
                })
            } else {
                console.log("user exist", user.data().id)
                // done(null, user.data())
            }
  });

  console.log(req.body, 'adf')
  res.send({ok: 'ok'})
  
})


router.get('/logout',  (req, res) => {
  res.send('ok')
  // res.redirect('http://localhost:5000/angular-532f5/us-central1/app/auth/logout-server');
})




module.exports = router;