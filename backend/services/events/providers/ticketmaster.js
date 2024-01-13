const axios  = require('axios');
const API_KEY = "1AN7L3M4BCM3AMiuIT2SMW4lS1XxnuW7";
const _ = require('lodash');
const moment = require('moment');


function extractName(name) {
    return name.split(/:|(vs)|(v\.)|-/)[0].trim();
}
async function queryEvents(city) {
    return axios.get(`https://app.ticketmaster.com/discovery/v2/events` , {
        params: {
            city: city,
            apikey: API_KEY
        }
    }).then(result => {

        return _.unionBy((result.data?._embedded?.events?.sort((a, b) => {
            const momentA = moment(a.dates.start.localDate);
            const momentB = moment(b.dates.start.localDate);
            if (momentA.isAfter(momentB)) {
                return 1;
            }else if (momentB.isAfter(momentA)) {
                return -1
            }else {
                return 0;
            }
        }).map(item=>{
            return {
                name: extractName(item.name),
                type: item.type,
                id: item.id,
                images: item.images,
                classifications: item.classifications,
                date: moment(item.dates.start.localDate).format('ddd, MMM Do')
            }
        }) || []), 'name');
    })
}

module.exports = {
    queryEvents: queryEvents
}