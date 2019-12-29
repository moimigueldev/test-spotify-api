const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const keys = require('../auth-config');
const admin = require('firebase-admin');
const serviceAccountKey = require('.././ServiceAccountKey.json')

admin.initializeApp ({
    credential: admin.credential.cert(serviceAccountKey)
});

let db = admin.firestore();




passport.use(
    new SpotifyStrategy(
        {
            clientID: keys.spotify['client-id'],
            clientSecret: keys.spotify['client-secret'],
            callbackURL: keys.spotify['redirect-url'],

        },
        async function (accessToken, refreshToken, expires_in, profile, done) {

            let user = await db.collection('spotify-users').doc(profile.id).get()

            if (!user.data()) { //does not exist yet

                console.log('creating new user');
                let newUser = {
                id: profile.id,
                dateUpdated: new Date(),
                displayName: profile.displayName,
                followers: profile.followers,
                accessToken:accessToken
              };

              console.log(newUser)
              
              db.collection('spotify-users').doc(profile.id).set(newUser).then((user) => {
                  console.log('new User Created', user)
              })
            } else {
                console.log("user exist", user.data())
            }

            
        }
    )
);
