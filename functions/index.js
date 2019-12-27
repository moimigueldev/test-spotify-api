const functions = require('firebase-functions');




const express = require('express');
    path = require('path'),
    app = express(),
    bodyParser = require('body-parser')
    port = process.ENV || 4000;
const cors = require('cors');


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
    
app.get('/auth/login', (req, res) => {
    console.log('Login page hit');
    res.send('login you in')
})


app.get('/', (req, res) => {
    console.log('Main Page hit');
    // res.send('Hello')
    res.send('Hello from the server');
})

// app.listen(port, () => {
//     console.log(`listening on ports: ${port}`);
    
// });


// // Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
