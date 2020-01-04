const admin = require('firebase-admin');
const serviceAccountKey = require('.././ServiceAccountKey.json')

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccountKey)
// });

const db = admin.firestore();


searchDBForUser = async (userLoggedIn, token) => {
    const profile = userLoggedIn
    const user = await db.collection('spotify-users').doc(profile.id).get();

    if (!user.data()) { //does not exist yet
        console.log('creating new user');
        const newUser = {
            id: profile.id,
            dateUpdated: new Date(),
            displayName: profile.displayName,
            followers: profile.followers,
            token
        };

        
        db.collection('spotify-users').doc(profile.id).set(newUser).then((user) => {
            return user.data();
        })
    } else {
        return user.data();
    }
}


module.exports = searchDBForUser