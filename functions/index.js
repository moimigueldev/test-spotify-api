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


// app.use((req, res, next) =>  {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

app.get('/auth/logout', (req, res) => {
    console.log("hitting the login url");
    // res.send('login you out');
    res.redirect('http://localhost:5000/angular-532f5/us-central1/app/auth/redirect/');

});

app.get('/auth/redirect', (req, res) => {
    console.log('hit the redirect');

    res.send('redirected')
})

// app.get('/', (req, res) => {
//     res.send('ok')
// })
    



exports.app = functions.https.onRequest(app);