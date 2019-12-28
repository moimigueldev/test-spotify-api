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
//     res.header("Access-Control-Allow-Origin", "https://onsnip.com/"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

app.get('/auth/logout', (req, res) => {
    console.log("hitting the login url");
    res.send('login you out');
})

// app.get('/', (req, res) => {
//     res.send('ok')
// })
    



exports.app = functions.https.onRequest(app);