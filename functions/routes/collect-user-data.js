const request = require('request');
const rp = require('request-promise')


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


module.exports= {artistFollowing,
playlist}