const functions = require('firebase-functions');


const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors');
// keys = require('./auth-config');



const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup'); // NOT IN USE, BUT NEEDS TO BE IN INDEX.JS
const cookieSession = require('cookie-session');
const passport = require('passport')



// app.use(cookieSession({
//     maxAge: 24 * 60 * 60 * 1000, // max age is a day
//     keys: ['user'], //encrypts the cookie,
// }));



app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use('/auth', authRoutes)



app.get('/', (req, res) => {
    res.send('ok')
})





exports.app = functions.https.onRequest(app);