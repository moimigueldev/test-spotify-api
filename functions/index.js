const functions = require('firebase-functions');


const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors');




const authRoutes = require('./routes/auth-routes');



app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use('/auth', authRoutes)



app.get('/', (req, res) => {
    res.send('ok')
})





exports.app = functions.https.onRequest(app);