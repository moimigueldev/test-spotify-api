const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const keys = require('../auth-config');
const cors = require('cors')

var whitelist = ['http://localhost:4200',  ]




passport.use(
    new SpotifyStrategy(
        {
            clientID: keys.spotify['client-id'],
            clientSecret: keys.spotify['client-secret'],
            callbackURL: keys.spotify['redirect-url'],

        },
        function (accessToken, refreshToken, expires_in, profile, done) {
            console.log(profile)
        }
    )
);
