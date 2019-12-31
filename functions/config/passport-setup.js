const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const keys = require('../auth-config');
const admin = require('firebase-admin');
const serviceAccountKey = require('.././ServiceAccountKey.json')

admin.initializeApp ({
    credential: admin.credential.cert(serviceAccountKey)
});

const db = admin.firestore();

passport.serializeUser((user, done) => {
    console.log('Serializing user', user)
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log('Deserializing user', id)
    const user = await db.collection('spotify-users').doc(id).get();
    done(null, user.data())


})




passport.use(
    new SpotifyStrategy(
        {
            clientID: keys.spotify['client-id'],
            clientSecret: keys.spotify['client-secret'],
            callbackURL: keys.spotify['redirect-url'],

        },
        async function (accessToken, refreshToken, expires_in, profile, done) {
            const user = await db.collection('spotify-users').doc(profile.id).get();

            if (!user.data()) { //does not exist yet
                console.log('creating new user');
                const newUser = {
                id: profile.id,
                dateUpdated: new Date(),
                displayName: profile.displayName,
                followers: profile.followers,
                accessToken:accessToken
              };

              
              db.collection('spotify-users').doc(profile.id).set(newUser).then((user) => {
                  console.log('new User Created', user.data().id)
                  done(null, user.data())
              })
            } else {
                console.log("user exist", user.data().id)
                done(null, user.data())  
            }
        } //end of asyn function
    )//end of passport Strategy
); //end of passport.use
