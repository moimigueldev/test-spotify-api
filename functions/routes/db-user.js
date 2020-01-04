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
            displayName: profile.display_name,
            followers: profile.followers,
            token,
            artistFollowing: [],
            playlist: [],
            filteredTracks: [],
            topTracks: [],
            topArtist: [],
            tracksThisMonth: [],
            tracksThisYear: [],
            tracksLastYear: []
        };

        
        db.collection('spotify-users').doc(profile.id).set(newUser).then((user) => {
            return user.data();
        })
    } else {
        return user.data();
    }
}


saveUserData = async(data, token) => {
    // console.log('user', data)
    const updateUser = {
        id: data.user.id,
        dateUpdated: new Date(),
        displayName: data.user.display_name,
        followers: data.user.followers,
        token,
        artistFollowing: data.userArtistFollowing,
        playlist: data.userPlaylist,
        savedTracks: data.userSavedTracks,
        topTracks: data.userTopTracks,
        topArtist: data.userTopArtist
    }; 
    // console.log('user', updateUser)
    db.collection('spotify-users').doc(data.user.id).update({
        token,
        artistFollowing: data.userArtistFollowing,
        playlist: data.userPlaylist,
        topTracks: data.userTopTracks,
        topArtist: data.userTopArtist,
        dateUpdated: new Date(),
        filteredTracks: data.filteredTracks,
        tracksThisMonth: data.filteredTracks.thisMonth,
        tracksThisYear: data.filteredTracks.thisYear,
        tracksLastYear: data.filteredTracks.lastYear
    })
    .then(response => {
        console.log('user', response)
        return response
    })
    .catch(err => console.log('ERROR saving user data to the db', err))
  

    return 'ok'
}


module.exports = {
    searchDBForUser,
    saveUserData
}