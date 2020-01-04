const functions = require('firebase-functions');


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const filterData = require('./routes/filter-data');


const admin = require('firebase-admin');
const serviceAccountKey = require('./ServiceAccountKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
});


app.use(cookieParser())

// set a cookie
app.use(function (req, res, next) {
    // check if client sent cookie
    var cookie = req.cookies.cookieName;
    console.log('cookie',  req.cookie)
    // if (cookie === undefined)
    // {
    //   // no: set a new cookie
    //   var randomNumber=Math.random().toString();
    //   randomNumber=randomNumber.substring(2,randomNumber.length);
    //   res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
    //   console.log('cookie created successfully');
    // } 
    // else
    // {
    //   // yes, cookie was already present 
    //   console.log('cookie exists', cookie);
    // } 
    next(); // <-- important!
  });




const authRoutes = require('./routes/auth-routes');



app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// console.log('filter'; filterData.userData())

app.use('/auth', authRoutes)



app.get('/', (req, res) => {
    res.send('ok')
})





exports.app = functions.https.onRequest(app);