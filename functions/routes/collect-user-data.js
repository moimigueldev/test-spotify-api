const request = require('request');
const rp = require('request-promise');
const admin = require('firebase-admin');
const serviceAccountKey = require('.././ServiceAccountKey.json')

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccountKey) 
// });

const db = admin.firestore();


artistFollowing = async (id, token) => {
    const options = {
        'method': 'GET',
        'url': 'https://api.spotify.com/v1/me/following?type=artist&limit=50',
        'headers': {
          'Authorization': `Bearer ${token}`
        }
      };

    let artistFollowing = await rp(options)
    artistFollowing = JSON.parse(artistFollowing)

    return artistFollowing
    
    // console.log('id', id, token)
}

playlist = async (id, token) => {

    const options = {
        'method': 'GET',
        'url': `https://api.spotify.com/v1/users/${id}/playlists?limit=50`,
        'headers': {
          'Authorization': `Bearer ${token}`
        }
      };


      let playlist = await rp(options)
    playlist = JSON.parse(playlist)

    return playlist
    
}

let savedTracksTotal;
let savedTracksOffset = 0;
let tracksList = [];

savedtracks = async (offset, token) =>  {
 console.log('looping', offset)

  
  // limit=50&offset=50

  // let tracks = await rp(options)
  let tracks = await getUsersSavedTracks(offset, token)
  tracks = JSON.parse(tracks)
  tracks.items.length ? tracksList.push(...tracks.items): null;
  
  if(offset !== tracks.total) {
    console.log('total', tracks.total - offset)
    //makes sure call does not go over the amount off tracks
  offset = tracks.total - offset >= 50? offset + 50 : (tracks.total - offset) + offset 
  // console.log('diffoffset', diff)
    // savedTracksOffset += 50;
    return savedtracks(offset, token)
  }

  return tracksList

}


getUsersSavedTracks = async (offset, token) => {
  console.log('getting user', offset)
  const options = {
    'method': 'GET',
    'url': `https://api.spotify.com/v1/me/tracks?limit=50&offset=${offset}`,
    'headers': {
      'Authorization': `Bearer ${token}`
    }
  };

  return new Promise((resolve, reject) => {
    resolve(rp(options))
  })
  
}


module.exports= {artistFollowing,
playlist, savedtracks}