const trackList = require('../tracks-small')
// const largeList = require('../tracks')
const moment = require('moment');



tracksAdded = () => {
    const date = moment().format().toString().split('-');
    const thisYear = [];
    const lastYear = [];



    const thisMonth = trackList.filter(el => {
        const createdAt = el.added_at.split('-');
        // tracks added this year
        if(createdAt[0] === date[0] )thisYear.push(el);
        // Tracks added last year
        if(Number(createdAt[0]) === Number(date[0] - 1))  lastYear.push(el);

        //Tracks Added This Month
        if (createdAt[0] === date[0] && createdAt[1] === date[1]) return el;
    })

    return (thisMonth, thisYear, lastYear)
}




module.exports = {tracksAdded}