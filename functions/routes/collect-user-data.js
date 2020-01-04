const rp = require('request-promise');
const admin = require('firebase-admin');
const db = admin.firestore();
const filterData = require('./filter-data');

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
}

playlist = async (id, token) => {

  const options = {
    'method': 'GET',
    'url': `https://api.spotify.com/v1/users/${id}/playlists?limit=20`,
    'headers': {
      'Authorization': `Bearer ${token}`
    }
  };


  let playlist = await rp(options)
  playlist = JSON.parse(playlist)
  return playlist

}

let tracksList = [];

savedtracks = async (offset, token) => {
  console.log('looping', offset)

  let tracks = await getUsersSavedTracks(offset, token)
  tracks = JSON.parse(tracks)


  tracks.items.length ? tracksList.push(...tracks.items) : null;

  // if (offset !== tracks.total) {

  //   offset = tracks.total - offset >= 50 ? offset + 50 : (tracks.total - offset) + offset

  //   return savedtracks(offset, token)
  // }

  return tracksList
}


getUsersSavedTracks = async (offset, token) => {
  const options = {
    'method': 'GET',
    'url': `https://api.spotify.com/v1/me/tracks?limit=50&offset=${offset}`,
    'headers': {
      'Authorization': `Bearer ${token}`
    }
  };

    return rp(options)


}


module.exports = {
  artistFollowing,
  playlist, savedtracks
}