const functions = require('firebase-functions');


const express = require('express');
    path = require('path'),
    app = express(),
    bodyParser = require('body-parser'),
    port = process.ENV || 4000,
    cors = require('cors');

    

const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup')


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use('/auth', authRoutes)

app.get('/', (req , res) => {

    res.send('ok')
})





exports.app = functions.https.onRequest(app);