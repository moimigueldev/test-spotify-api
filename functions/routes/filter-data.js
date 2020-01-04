const trackList = require('../tracks-small')
const largeList = require('../tracks')
const moment = require('moment');


userData = () => {
    const date = moment().format().toString().split('-');
    const thisYear = [];
    const lastYear = [];
    const thisMonth = [];
    const artistsList = {}

    trackList.forEach(el => {

        const createdAt = el.added_at.split('-');
        const artist = el.track.album.artists[0].name

            // TRACKS ADDED THIS YEAR, MONTH, LAST YEAR

            // tracks added this year
            if(createdAt[0] === date[0] ) thisYear.push(el);
            // Tracks added last year
            if(Number(createdAt[0]) === Number(date[0] - 1))  lastYear.push(el);
    
            //Tracks Added This Month
            if (createdAt[0] === date[0] && createdAt[1] === date[1]) thisMonth.push(el);


            // ARTISTS LITENED TO
            if(artistsList[artist]) {
                artistsList[artist] += 1
            } else {
                artistsList[artist] = 1
            }

    }); //end of loop

    const artistSorted = Object.keys(artistsList).sort(function (a, b) { return artistsList[a] - artistsList[b] }).reverse()

   

    return {thisMonth, thisYear, lastYear, artistSorted}
}

// this sniped gives the sorted list the object values back, might not be necessery
returnSortedArtistValues = (list, original) => {
    const finalArtistList = {}
    list.forEach(el => {
        
        finalArtistList[el] = original[el];
    })
    return finalArtistList;
}


module.exports = {userData}