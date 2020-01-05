const functions = require('firebase-functions');


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const filterData = require('./routes/filter-data');
const cacheControl = require('express-cache-controller')


const admin = require('firebase-admin');
const serviceAccountKey = require('./ServiceAccountKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
});

// app.use(cacheControl({maxAge:24 * 60 * 60 * 1000, noCache: true}))
app.use(cookieParser())

// set a cookie




const authRoutes = require('./routes/auth-routes');



app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// console.log('filter', filterData.userData())

app.use('/auth', authRoutes)



app.get('/', (req, res) => {
    res.send('ok')
})





exports.app = functions.https.onRequest(app);