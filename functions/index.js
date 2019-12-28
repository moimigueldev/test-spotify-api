const functions = require('firebase-functions');

const express = require('express');
    path = require('path'),
    app = express(),
    bodyParser = require('body-parser'),
    port = process.ENV || 4000,
    cors = require('cors');

 
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/auth/logout', (req, res) => {
    console.log("hitting the login url");
    res.send('login you out');
})
    

app.get('/', (req, res) => {
    console.log('Main Page hit');
    res.send('Hello from the server');
})

exports.app = functions.https.onRequest(app);