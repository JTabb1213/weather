const axios  = require('axios');
const API_KEY = "1AN7L3M4BCM3AMiuIT2SMW4lS1XxnuW7";
const _ = require('lodash');



function extractName(name) {
    return name.split(/:|(vs)|-/)[0].trim();
}
async function queryEvents(city) {
    return axios.get(`https://app.ticketmaster.com/discovery/v2/events` , {
        params: {
            city: city,
            apikey: API_KEY
        }
    }).then(result => {
        return _.unionBy((result.data?._embedded?.events?.map(item=>{
            return {
                name: extractName(item.name),
                type: item.type,
                id: item.id,
                images: item.images,
                classifications: item.classifications
            }
        }) || []), 'name');
    })
}

module.exports = {
    queryEvents: queryEvents
}